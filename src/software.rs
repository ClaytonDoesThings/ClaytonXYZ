use crate::product::*;
use lazy_static::lazy_static;
use std::collections::HashMap;
use maplit::hashmap;
use indexmap::{
    indexmap,
};
use chrono::naive::NaiveDateTime;

pub type Software<'a> = HashMap<&'a str, Product<'a>>;

lazy_static! {
    pub static ref SOFTWARE: Software<'static> = {
        hashmap!{
            "calculator-the-game-cheats" => Product {
                title: "Calculator: The Game - Cheats",
                description: "Cheats for \"Calculator The Game\"",
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
                description: "Translates ComCode to text and vice-versa.",
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
                description: "Make images from other images",
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
                description: "An encoder & decoder for \"cryptic\" fonts. BirbText and AlienText fonts made by Deborah#6709 based on the symbols designed by Creator Ink and The Game Theorists.",
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
                description: "",
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
                description: "Do word searches instantly",
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
                description: "Do word searches INSTANTLY! Now with OCR. To begin, upload an image. Then, crop the image to JUST the letter of the word search. Then, hit the \"recognize\" button, wait. Then, ensure the recognized text is correct, if not, change it. Hit \"tab\" and then enter the search terms on the following screen. When finished, hit tab again. The next screen will then show you the results of the word search. REMEMBER, the coordinates for the letters start at ZERO. X goes right and Y goes down. Press tab again to display the word search with the found words highlighted.",
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
        }
    };
}