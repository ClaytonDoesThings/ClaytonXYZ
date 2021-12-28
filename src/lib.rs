pub mod product;
mod games;
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
}

use aes::{
    Aes128,
    NewBlockCipher,
    cipher::generic_array::GenericArray,
};

lazy_static! {
    pub static ref CIPHER: Aes128 = Aes128::new(GenericArray::from_slice("key".as_bytes()));
}