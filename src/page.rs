use rocket::{
    State,
};
use crate::Config;

use maud::{DOCTYPE, html, Markup};

pub fn page(config: &State<Config>, title: &str, description: &str, cannonical_path: &str, highlighted_path: Option<&str>, content: Markup) -> Markup {
    let nav_element = |text: &str, path: &str| -> Markup {
        html! {
            div class=(format!("nav-item{}", match highlighted_path {
                Some(highlighted_path) if highlighted_path==path => " nav-item-selected",
                _ => ""
            })) {
                a href={(config.domain)(path)} { (text) }
            }
        }
    };
    html! {
        (DOCTYPE)
        html lang="en" { // Only English is supported as of now
            head {
                title {(title)}
                meta name="description" content=(description);
                link rel="canonical" href=(format!("{}{}", config.domain, cannonical_path));
                meta name="viewport" content="width=device-width, initial-scale=1";
                link rel="stylesheet" type="text/css" href="/s/styles.css";
                link rel="icon" type="image/ico" href="/favicon.ico";
            }
            body {
                nav id="nav" {
                    (nav_element("Home", "/"))
                    (nav_element("Games", "/games"))
                    (nav_element("Software", "/software"))
                    (nav_element("Blog", "/blog"))
                }
                main id="content" {
                    (content)
                }
                footer id="footer" {
                    hr;
                    p { "Check out the code on " a href="https://github.com/ClaytonDoesThings/ClaytonXYZ" { "github.com" } }
                    div id="footer-socials" {
                        a href="https://www.youtube.com/channel/UChXdVQ8mm8UQBir87KaRgTQ" target="_blank"  { img src="/s/logos/YouTube-logo.png" alt="YouTube"; }
                        a href="https://www.patreon.com/ClaytonDoesThings" target="_blank"  { img src="/s/logos/Patreon-logo.png" alt="Patreon"; }
                        a href="https://discordapp.com/invite/nSGT8BJ" target="_blank"  { img src="/s/logos/Discord-logo.png" alt="Discord"; }
                        a href="https://twitter.com/ClaytonsThings" target="_blank"  { img src="/s/logos/Twitter-logo.png" alt="Twitter"; }
                    }
                }
            }
        }
    }
}