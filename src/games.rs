use crate::product::*;
use lazy_static::lazy_static;
use indexmap::{
    indexmap,
    IndexMap,
};
use chrono::naive::NaiveDateTime;

pub type Games<'a> = IndexMap<&'a str, Product<'a>>;

lazy_static! {
    pub static ref GAMES: Games<'static> = indexmap!{
        "arc-2" => Product {
            title: "Arc 2",
            desc_text: "Endless Arcade Game. You need to press A+D (at the same exact time) for the game to actually start. The goal of the game is to get the highest score. To gain score, collect purple squares or clear a stage by hitting a pink square. You have two minutes to get as many points and stage clears as possible. To submit your score (only if using the CDT branch - currently), type your name in the box below the main player and hit \"Submit High Score\". Note: this game was developed by Hayden Shuker, not Clayton Hickey.",
            desc_markup: None,
            release_streams: indexmap!{
                "web-cdt" => ReleaseStream {
                    title: "Web - CDT Fork",
                    releases: Releases::Web(indexmap!{
                        "v1.0.2" => WebRelease {
                            body: "s/games/arc-2/web-cdt/v1.0.2/index.body",
                        },
                    })
                },
                "web" => ReleaseStream {
                    title: "Web",
                    releases: Releases::Web(indexmap!{
                        "v1.0.2" => WebRelease {
                            body: "s/games/arc-2/web/v1.0.2/index.body"
                        },
                    })
                },
            },
            last_update: NaiveDateTime::from_timestamp(1563202271, 0)
        },
        "arc-plat" => Product {
            title: "Arc Plat",
            desc_text: "Endless Arcade Game. Note: this game was developed by Hayden Shuker, not Clayton Hickey.",
            desc_markup: None,
            release_streams: indexmap!{
                "web" => ReleaseStream {
                    title: "Web",
                    releases: Releases::Web(indexmap!{
                        "v1.1.1" => WebRelease {
                            body: "s/games/arc-plat/web/v1.1.1/index.body",
                        },
                        "v1.1.2" => WebRelease {
                            body: "s/games/arc-plat/web/v1.1.2/index.body",
                        },
                    })
                },
            },
            last_update: NaiveDateTime::from_timestamp(1563202271, 0)
        },
        "carai" => Product {
            title: "CarAI",
            desc_text: "An AI made from scratch. Video showing the making and an explaination for how it works is here: https://youtu.be/jjhNab0bJgQ",
            desc_markup: None,
            release_streams: indexmap!{
                "web" => ReleaseStream {
                    title: "Web",
                    releases: Releases::Web(indexmap!{
                        "v1.0.0" => WebRelease {
                            body: "s/games/carai/web/v1.0.0/index.body"
                        },
                    })
                },
                "windows" => ReleaseStream {
                    title: "Windows",
                    releases: Releases::Download(indexmap!{
                        "v1.0.0" => DownloadRelease {
                            path: "s/games/carai/windows/v1.0.0/CarAI-v1.0.0-Windows.zip",
                        },
                    }),
                },
                "mac" => ReleaseStream {
                    title: "Mac",
                    releases: Releases::Download(indexmap!{
                        "v1.0.0" => DownloadRelease {
                            path: "s/games/carai/mac/v1.0.0/CarAI-v1.0.0-MacOS.zip",
                        },
                    }),
                },
                "linux" => ReleaseStream {
                    title: "Linux",
                    releases: Releases::Download(indexmap!{
                        "v1.0.0" => DownloadRelease {
                            path: "s/games/carai/linux/v1.0.0/CarAI-v1.0.0-Linux.zip",
                        },
                    }),
                },
            },
            last_update: NaiveDateTime::from_timestamp(1563202271, 0)
        },
        "demonic-conquest" => Product {
            title: "Demonic Conquest",
            desc_text: "The aim of this game is to gather the entire story of Dean Winchester. For that, you need to survive as much as you can. Of course, you'll need to feast on some souls. But nobody is giving their souls so easily - you must hide and sneak attack the people. Don't forget that you made a deal with a crossroad demon and the time has come to pay the price - that is, your own soul. The hellhounds especially didn't forget about the deal and they are itching to taste some bone. - created for Firetruck Game Jam",
            desc_markup: None,
            release_streams: indexmap!{
                "web" => ReleaseStream {
                    title: "Web",
                    releases: Releases::Web(indexmap!{
                        "v0.1" => WebRelease {
                            body: "s/games/demonic-conquest/web/v0.1/index.body",
                        },
                    }),
                },
                "windows" => ReleaseStream {
                    title: "Windows",
                    releases: Releases::Download(indexmap!{
                        "v0.1" => DownloadRelease {
                            path: "s/games/demonic-conquest/windows/v0.1/DemonicConquest0.1PC.zip",
                        },
                    }),
                },
                "mac" => ReleaseStream {
                    title: "Mac",
                    releases: Releases::Download(indexmap!{
                        "v0.1" => DownloadRelease {
                            path: "s/games/demonic-conquest/mac/v0.1/DemonicConquest0.1Mac.zip",
                        },
                    }),
                },
                "linux" => ReleaseStream {
                    title: "Linux",
                    releases: Releases::Download(indexmap!{
                        "v0.1" => DownloadRelease {
                            path: "s/games/demonic-conquest/linux/v0.1/DemonicConquest0.1Linux.zip",
                        },
                    }),
                },
            },
            last_update: NaiveDateTime::from_timestamp(1563202271, 0)
        },
        "dig-it" => Product {
            title: "Dig It",
            desc_text: "!.... !:,. !:,. !:.. !:, :::::,... ::::,.. ::::,.. :::::::::,.... !,... :::::::::,.. !::. !:,. !:. !: ! !:. !. !:, !:,. !.... !, !: !... !:, ::::,. !:: !::. !::.. - !, !:, - !:,. !.... !. - :::::::::,... !. !:, !:,. - !:,.... !. :::::::::,... !:, !, !:,. !. - !:,. !:. - !. !:,... !. !:.... - !. !:: !, !:, !:,. ::::,.",
            desc_markup: None,
            release_streams: indexmap!{
                "windows" => ReleaseStream {
                    title: "Windows",
                    releases: Releases::Download(indexmap!{
                        "v1.2.2" => DownloadRelease {
                            path: "s/games/dig-it/windows/v1.2.2/DigIt1.2.2PC.zip",
                        },
                    }),
                },
            },
            last_update: NaiveDateTime::from_timestamp(1563202271, 0)
        },
        "russian-roulette" => Product {
            title: "Russian Roulette",
            desc_text: "Russian Roulette Controls: 1-6 to load the chambers and space to spin/fire",
            desc_markup: None,
            release_streams: indexmap!{
                "web" => ReleaseStream {
                    title: "Web",
                    releases: Releases::Web(indexmap!{
                        "v1.1.0" => WebRelease {
                            body: "s/games/russian-roulette/web/v1.1.0/body.html",
                        },
                    }),
                },
            },
            last_update: NaiveDateTime::from_timestamp(1563202271, 0)
        },
        "tetris" => Product {
            title: "Tetris",
            desc_text: "It's tetris**.",
            desc_markup: None,
            release_streams: indexmap!{
                "web" => ReleaseStream {
                    title: "Web",
                    releases: Releases::Web(indexmap!{
                        "v1.0.0" => WebRelease {
                            body: "s/games/tetris/web/v1.0.0/body.html",
                        },
                    }),
                },
            },
            last_update: NaiveDateTime::from_timestamp(1563202271, 0)
        },
        "the-giver-the-game" => Product {
            title: "The Giver - The Game",
            desc_text: "WASD to move. Press Left Shift to hide from the plane. To win, get to the end of the dirt path. Clayton Does Thing or claytondoesthings.xyz is in no way affiliated with \"The Giver\" or any other person(s) that were involved with the creation of \"The Giver\" in any way.",
            desc_markup: None,
            release_streams: indexmap!{
                "web" => ReleaseStream {
                    title: "Web",
                    releases: Releases::Web(indexmap!{
                        "v1.0" => WebRelease {
                            body: "s/games/the-giver-the-game/web/v1.0/body.html",
                        },
                    }),
                },
                "linux64" => ReleaseStream {
                    title: "Linux",
                    releases: Releases::Download(indexmap!{
                        "v1.0" => DownloadRelease {
                            path: "s/games/the-giver-the-game/linux64/v1.0/TheGiverTheGame-1.0-Linux64.zip",
                        },
                    }),
                },
                "windows32" => ReleaseStream {
                    title: "Windows x32",
                    releases: Releases::Download(indexmap!{
                        "v1.0" => DownloadRelease {
                            path: "s/games/the-giver-the-game/windows32/v1.0/TheGiverTheGame-1.0-Windows32.zip",
                        },
                    }),
                },
                "windows64" => ReleaseStream {
                    title: "Windows x64",
                    releases: Releases::Download(indexmap!{
                        "v1.0" => DownloadRelease {
                            path: "s/games/the-giver-the-game/windows64/v1.0/TheGiverTheGame-1.0-Windows64.zip",
                        },
                    }),
                },
            },
            last_update: NaiveDateTime::from_timestamp(1563202271, 0)
        },
    };
}