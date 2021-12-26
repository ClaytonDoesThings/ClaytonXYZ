pub mod product;
mod games;
pub use games::GAMES;
mod software;
pub use software::SOFTWARE;
mod legacy_redirects;
pub use legacy_redirects::LEGACY_REDIRECTS;
pub mod blog;

pub struct Config {
    pub domain: String,
}

mod page;
pub use page::page;