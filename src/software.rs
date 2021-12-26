use crate::product::*;
use lazy_static::lazy_static;
use std::collections::HashMap;
use maplit::hashmap;
use indexmap::{
    indexmap,
};
use chrono::naive::NaiveDateTime;
use maud::html;

pub type Software<'a> = HashMap<&'a str, Product<'a>>;

lazy_static! {
    pub static ref SOFTWARE: Software<'static> = hashmap!{
        "calculator-the-game-cheats" => Product {
            title: "Calculator: The Game - Cheats",
            desc_text: "Cheats for \"Calculator The Game\"",
            desc_markup: None,
            release_streams: indexmap!{
                "web" => ReleaseStream {
                    title: "Web",
                    releases: Releases::Web(indexmap!{
                        "v1.0" => WebRelease {
                            body: "s/software/calculator-the-game-cheats/web/v1.0.html",
                        },
                    }),
                },
            },
            last_update: NaiveDateTime::from_timestamp(1563202271, 0)
        },
        "comcode-translator" => Product {
            title: "ComCode Translator",
            desc_text: "Translates ComCode to text and vice-versa.",
            desc_markup: None,
            release_streams: indexmap!{
                "web" => ReleaseStream {
                    title: "Web",
                    releases: Releases::Web(indexmap!{
                        "v1.0.0" => WebRelease {
                            body: "s/software/comcode-translator/web/v1.0.0.html",
                        },
                    }),
                },
            },
            last_update: NaiveDateTime::from_timestamp(1563202271, 0)
        },
        "legitimate-images-made-from-images" => Product {
            title: "Legitimate Images Made From Images",
            desc_text: "Make images from other images",
            desc_markup: None,
            release_streams: indexmap!{
                "web" => ReleaseStream {
                    title: "Web",
                    releases: Releases::Web(indexmap!{
                        "v1.0.0" => WebRelease {
                            body: "s/software/legitimate-images-made-from-images/web/v1.0.0/body.html",
                        },
                    }),
                },
            },
            last_update: NaiveDateTime::from_timestamp(1563202271, 0)
        },
        "symbol-translator" => Product {
            title: "Symbol Translator",
            desc_text: "An encoder & decoder for \"cryptic\" fonts. BirbText and AlienText fonts made by Deborah#6709 based on the symbols designed by Creator Ink and The Game Theorists.",
            desc_markup: None,
            release_streams: indexmap!{
                "web" => ReleaseStream {
                    title: "Web",
                    releases: Releases::Web(indexmap!{
                        "v1.1.2" => WebRelease {
                            body: "s/software/symbol-translator/web/v1.1.2/body.html",
                        },
                        "v1.2.0" => WebRelease {
                            body: "s/software/symbol-translator/web/v1.2.0/body.html",
                        },
                    }),
                },
            },
            last_update: NaiveDateTime::from_timestamp(1563202271, 0)
        },
        "tessellation-creator" => Product {
            title: "Tessellation Creator",
            desc_text: "",
            desc_markup: None,
            release_streams: indexmap!{
                "web" => ReleaseStream {
                    title: "Web",
                    releases: Releases::Web(indexmap!{
                        "v1.0.0" => WebRelease {
                            body: "s/software/tessellation-creator/web/v1.0.0/body.html",
                        },
                    }),
                },
            },
            last_update: NaiveDateTime::from_timestamp(1563202271, 0)
        },
        "word-search-cheats" => Product {
            title: "Word Search Cheats",
            desc_text: "Do word searches instantly",
            desc_markup: None,
            release_streams: indexmap!{
                "web" => ReleaseStream {
                    title: "Web",
                    releases: Releases::Web(indexmap!{
                        "v1.0.0" => WebRelease {
                            body: "s/software/word-search-cheats/web/v1.0.0.html",
                        },
                    }),
                },
            },
            last_update: NaiveDateTime::from_timestamp(1563202271, 0)
        },
        "word-search-cheats-ocr" => Product {
            title: "Word Search Cheats OCR",
            desc_text: "Do word searches INSTANTLY! Now with OCR. To begin, upload an image. Then, crop the image to JUST the letter of the word search. Then, hit the \"recognize\" button, wait. Then, ensure the recognized text is correct, if not, change it. Hit \"tab\" and then enter the search terms on the following screen. When finished, hit tab again. The next screen will then show you the results of the word search. REMEMBER, the coordinates for the letters start at ZERO. X goes right and Y goes down. Press tab again to display the word search with the found words highlighted.",
            desc_markup: None,
            release_streams: indexmap!{
                "web" => ReleaseStream {
                    title: "Web",
                    releases: Releases::Web(indexmap!{
                        "v1.0.0" => WebRelease {
                            body: "s/software/word-search-cheats-ocr/web/v1.0.0/body.html",
                        },
                    }),
                },
            },
            last_update: NaiveDateTime::from_timestamp(1563202271, 0)
        },
        "sound_galaxy" => Product {
            title: "Sound Galaxy",
            desc_text: "An audio visualizer adapted from https://executebig.notion.site/Mini-1-Sound-Galaxy-bf5eb59488b54c2ab4a0a088499153d0 to use Rust.",
            desc_markup: Some(html! {
                p {
                    "An audio visualizer adapted from " a href="https://executebig.notion.site/Mini-1-Sound-Galaxy-bf5eb59488b54c2ab4a0a088499153d0" target="_blank" { "ExecuteBig" } " to use Rust."
                }
                iframe width="560" height="315" src="https://www.youtube.com/embed/kzUnaH4M824" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen {}
            }),
            release_streams: indexmap!{
                "linux" => ReleaseStream {
                    title: "Linux",
                    releases: Releases::Download(indexmap!{
                        "v1.0.0" => DownloadRelease {
                            path: "s/software/sound_galaxy/linux/sound_galaxy-v1.0.0-linux64",
                        },
                    }),
                },
                "windows" => ReleaseStream {
                    title: "Windows x64",
                    releases: Releases::Download(indexmap!{
                        "v1.0.0" => DownloadRelease {
                            path: "s/software/sound_galaxy/windows/sound_galaxy-v1.0.0-win64.exe",
                        },
                    }),
                },
            },
            last_update: NaiveDateTime::from_timestamp(1640400117, 0)
        },
    };
}