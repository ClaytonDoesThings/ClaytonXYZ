pub mod product;
mod games;
use dotenv::dotenv;
pub use games::GAMES;
mod software;
pub use software::SOFTWARE;
mod legacy_redirects;
pub use legacy_redirects::LEGACY_REDIRECTS;
pub mod blog;
pub mod accounts;
mod page;
pub use page::page;
use lazy_static::lazy_static;

pub struct Config {
    pub domain: String,
    pub static_dir: std::path::PathBuf,
}

use aes::{
    Aes128,
    cipher::{
        generic_array::GenericArray,
        KeyInit,
    },
};

lazy_static! {
    pub static ref CIPHER: Aes128 = Aes128::new(&GenericArray::from(dotenv::var("EMAIL_VERIFICATION_KEY").expect("failed to get EMAIL_VERIFICATION_KEY env var").parse::<u128>().expect("failed to parse EMAIL_VERIFICATION_KEY as u128").to_be_bytes()));
}
