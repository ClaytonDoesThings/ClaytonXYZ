use rocket::{
    get,
    post,
    State,
    form::Form,
    FromForm,
    response::Responder,
    http::Status,
};
use crate::{
    page,
    Config,
    CIPHER,
};
use maud::{
    html,
    Markup,
};
use pbkdf2::{
    password_hash::{
        self,
        rand_core::OsRng,
        PasswordHash,
        PasswordHasher,
        PasswordVerifier,
        SaltString,
    },
    Pbkdf2,
};
use lazy_static::lazy_static;
use std::collections::{
    HashMap,
};
use maplit::hashmap;
use unicase::UniCase;
use regex::Regex;
use std::sync::Mutex;
use aes::{
    Aes128,
    Block,
    BlockEncrypt,
    BlockCipher,
    NewBlockCipher,
    cipher::generic_array::GenericArray,
};

#[get("/auth")]
pub fn auth_page(config: &State<Config>) -> Markup {
    page(config, "Auth | Clayton Does Things", "Login/signup page for Clayton Does Things", "/login", Some("/login"), html! {
        iframe name="dummyframe" id="dummyframe" style="display: none;" {}
        form action="/login" method="POST" {
            label for="username" { "username: " }
            input id="username" name="username";
            br;
            label for="password" { "Password: " }
            input type="password" id="password" name="password";
            br;
            input type="submit" value="Login";
        }
        form action="/signup" method="POST" target="dummyframe" {
            label for="username" { "Username: " }
            input id="username" name="username";
            br;
            label for="email" { "Email: " }
            input id="email" name="email";
            br;
            label for="password" { "Password: " }
            input type="password" id="password" name="password";
            br;
            input type="submit" value="Sign Up";
        }
    })
}

#[post("/signup", data="<signup_info>")]
pub async fn signup(signup_info: Form<SignupInfo>) -> Result<(), SignupError> {
    if !USERNAME_RE.is_match(signup_info.username.as_str()) {
        return Err(SignupError::InvalidUsername)
    }
    let username_unicase = UniCase::new(signup_info.username.clone());

    if !validator::validate_email(&signup_info.email) {
        return Err(SignupError::InvalidEmail)
    }

    if signup_info.password.len() < 7 {
        return Err(SignupError::InvalidPassword)
    }
    let salt = SaltString::generate(&mut OsRng);
    let password_hash = Pbkdf2.hash_password(signup_info.password.as_bytes(), &salt)?;
    
    {
        let mut username_table = USERNAME_TABLE.lock().unwrap();
        let mut pending_user_table = PENDING_USER_TABLE.lock().unwrap();
        if username_table.contains_key(&username_unicase) {
            return Err(SignupError::AccountWithUsernameAlreadyExists)
        }
        username_table.insert(username_unicase.clone(), UsernameTablePointer::PendingUser);

        pending_user_table.insert(username_unicase, PendingUser {
            username: signup_info.username.clone(),
            email: signup_info.email.clone(),
            password_salt: salt.as_str().to_string(),
            password_hash: password_hash.hash.unwrap().to_string(),
        });
    }

    let mut block = Block::from_slice(&[0]).clone();
    CIPHER.encrypt_block(&mut block);
    println!("{:?}", block);

    Ok(())
}

#[derive(Debug)]
pub enum SignupError {
    InvalidEmail,
    InvalidUsername,
    InvalidPassword,
    AccountWithUsernameAlreadyExists,
    HashingError(password_hash::Error),
}

impl From<password_hash::Error> for SignupError {
    fn from(err: password_hash::Error) -> SignupError {
        SignupError::HashingError(err)
    }
}

impl<'r> Responder<'r, 'r> for SignupError {
    fn respond_to(self, _request: &'r rocket::Request<'_>) -> rocket::response::Result<'r> {
        match self {
            SignupError::InvalidUsername | SignupError::InvalidEmail | SignupError::InvalidPassword=> Err(Status::BadRequest),
            SignupError::AccountWithUsernameAlreadyExists => Err(Status::Conflict),
            Self::HashingError(_) => Err(Status::InternalServerError),
        }
    }
}

#[derive(FromForm)]
pub struct SignupInfo {
    pub username: String,
    pub email: String,
    pub password: String,
}

pub enum UsernameTablePointer {
    PendingUser,
}

pub type UsernameTable<'a> = Mutex<HashMap<UniCase<String>, UsernameTablePointer>>;
lazy_static! {
    static ref USERNAME_RE: Regex = Regex::new(r"^[A-Za-z_0-9-]{3,21}$").unwrap();
    pub static ref USERNAME_TABLE: UsernameTable<'static> = Mutex::new(hashmap! {

    });
}

pub struct PendingUser {
    pub username: String,
    pub email: String,
    pub password_salt: String,
    pub password_hash: String,
}

pub type PendingUserTable<'a> = Mutex<HashMap<UniCase<String>, PendingUser>>;
lazy_static! {
    pub static ref PENDING_USER_TABLE: PendingUserTable<'static> = Mutex::new(hashmap! {

    });
}

lazy_static! {
    pub static ref EMAIL_VERIFICATION_TICKER: Mutex<u64> = Mutex::new(0);
}

pub enum EmailVerificationPointer {

}

pub type EmailVerificationTable<'a> = Mutex<HashMap<u64, EmailVerificationPointer>>;
lazy_static! {
    pub static ref EMAIL_VERIFICATION_TABLE: EmailVerificationTable<'static> = Mutex::new(hashmap! {

    });
}
