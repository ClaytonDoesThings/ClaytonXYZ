const express = require('express'),
    path = require("path");
    fs = require("fs");

const app = express();
const port = process.env.PORT || 8080;
const googleAnalyticsID = process.env.GOOGLEANALYTICSID || false;
const adsterra728x90Key = process.env.ADSTERRA728X90KEY || false;

console.log(googleAnalyticsID ? "GOOGLEANALYTICSID=" + googleAnalyticsID : "Environment variable, \"GOOGLEANALYTICSID\", has not been assigned. Google Anlytics will not be used.");
console.log(adsterra728x90Key ? "ADSTERRA728X90KEY=" + adsterra728x90Key : "Environment variable, \"ADSTERRA728X90KEY\", has not been assigned. adsterra728x90 will not be used.");

var db = {
    games: {
        "arc-2": {
            title: "Arc 2",
            desc: `Endless Arcade Game. You need to press A+D (at the same exact time) for the game to actually start. The goal of the game is to get the highest score. To gain score, collect purple squares or clear a stage by hitting a pink square. You have two minutes to get as many points and stage clears as possible. To submit your score (only if using the CDT branch - currently), type your name in the box below the main player and hit "Submit High Score".`,
            platforms: {
                web: {
                    versions: {
                        "v1.0.2-CDT": {
                            index: 1
                        },
                        "v1.0.2": {
                            index: 0
                        }
                    }
                }
            },
            lastUpdated: 1563202271
        },
        "arc-plat": {
            title: "Arc Plat",
            desc: "Endless Platformer Game",
            platforms: {
                web: {
                    versions: {
                        "v1.1.2": {
                            index: 1
                        },
                        "v1.1.1": {
                            index: 0
                        }
                    }
                }
            },
            lastUpdated: 1563202271
        },
        "carai": {
            title: "CarAI",
            desc: "An AI made from scratch. Video showing the making and an explaination for how it works is here: https://youtu.be/jjhNab0bJgQ",
            platforms: {
                web: {
                    versions: {
                        "v1.0.0": {
                            index: 0
                        }
                    }
                },
                windows: {
                    versions: {
                        "v1.0.0": {
                            index: 0,
                            fileName: "CarAI-v1.0.0-Windows.zip"
                        }
                    }
                },
                mac: {
                    versions: {
                        "v1.0.0": {
                            index: 0,
                            fileName: "CarAI-v1.0.0-MacOS.zip"
                        }
                    }
                },
                linux: {
                    versions: {
                        "v1.0.0": {
                            index: 0,
                            fileName: "CarAI-v1.0.0-Linux.zip"
                        }
                    }
                }
            },
            lastUpdated: 1563202271
        },
        "demonic-conquest": {
            title: "Demonic Conquest",
            desc: "The aim of this game is to gather the entire story of Dean Winchester. For that, you need to survive as much as you can. Of course, you'll need to feast on some souls. But nobody is giving their souls so easily - you must hide and sneak attack the people. Don't forget that you made a deal with a crossroad demon and the time has come to pay the price - that is, your own soul. The hellhounds especially didn't forget about the deal and they are itching to taste some bone. - created for Firetruck Game Jam",
            platforms: {
                web: {
                    versions: {
                        "v0.1": {
                            index: 0
                        }
                    }
                },
                windows: {
                    versions: {
                        "v0.1": {
                            fileName: "DemonicConquest0.1PC.zip",
                            index: 0
                        }
                    }
                },
                mac: {
                    versions: {
                        "v0.1": {
                            fileName: "DemonicConquest0.1Mac.zip",
                            index: 0
                        }
                    }
                },
                linux: {
                    versions: {
                        "v0.1": {
                            fileName: "DemonicConquest0.1Linux.zip",
                            index: 0
                        }
                    }
                }
            },
            lastUpdated: 1563202271
        },
        "dig-it": {
            title: "Dig It",
            desc: "!.... !:,. !:,. !:.. !:, :::::,... ::::,.. ::::,.. :::::::::,.... !,... :::::::::,.. !::. !:,. !:. !: ! !:. !. !:, !:,. !.... !, !: !... !:, ::::,. !:: !::. !::.. - !, !:, - !:,. !.... !. - :::::::::,... !. !:, !:,. - !:,.... !. :::::::::,... !:, !, !:,. !. - !:,. !:. - !. !:,... !. !:.... - !. !:: !, !:, !:,. ::::,.",
            platforms: {
                windows: {
                    versions: {
                        "v1.2.2": {
                            index: 0,
                            fileName: "DigIt1.2.2PC.zip"
                        }
                    }
                }
            },
            lastUpdated: 1563202271
        },
        "russian-roulette": {
            title: "Russian Roulette",
            desc: "Russian Roulette Controls: 1-6 to load the chambers and space to spin/fire",
            platforms: {
                web: {
                    versions: {
                        "v1.1.0": {
                            index: 0
                        }
                    }
                }
            }
        },
        "tetris": {
            title: "Tetris",
            desc: "It's tetris.",
            platforms: {
                web: {
                    versions: {
                        "v1.0.0": {
                            index: 0
                        }
                    }
                }
            },
            lastUpdated: 1563202271
        },
        "the-giver-the-game": {
            title: "The Giver - The Game",
            desc: `WASD to move. Press Left Shift to hide from the plane. To win, get to the end of the dirt path. Clayton Does Thing or claytondoesthings.xyz is in no way affiliated with "The Giver" or any other person(s) that were involved with the creation of "The Giver" in any way.`,
            platforms: {
                web: {
                    versions: {
                        "v1.0": {
                            index: 0
                        }
                    }
                },
                linux64: {
                    versions: {
                        "v1.0": {
                            index: 0,
                            fileName: "TheGiverTheGame-1.0-Linux64.zip"
                        }
                    }
                },
                windows32: {
                    versions: {
                        "v1.0": {
                            index: 0,
                            fileName: "TheGiverTheGame-1.0-Windows32.zip"
                        }
                    }
                },
                windows64: {
                    versions: {
                        "v1.0": {
                            index: 0,
                            fileName: "TheGiverTheGame-1.0-Windows64.zip"
                        }
                    }
                }
            },
            lastUpdated: 1563202271
        }
    },
    software: {
        "calculator-the-game-cheats": {
            title: "Calculator: The Game - Cheats",
            desc: `Cheats for "Calculator The Game"`,
            platforms: {
                web: {
                    versions: {
                        "v1.0": {
                            index: 0
                        }
                    }
                }
            },
            lastUpdated: 1563202271
        },
        "comcode-translator": {
            title: "ComCode Translator",
            desc: "Translates ComCode to text and vice-versa.",
            platforms: {
                web: {
                    versions: {
                        "v1.0.0": {
                            index: 0
                        }
                    }
                }
            },
            lastUpdated: 1563202271
        },
        "legitimate-images-made-from-images": {
            title: "Legitimate Images Made From Images",
            desc: "Make images from other images",
            platforms: {
                web: {
                    versions: {
                        "v1.0.0": {
                            index: 0
                        }
                    }
                }
            },
            lastUpdated: 1563202271
        },
        "symbol-translator": {
            title: "Symbol Translator",
            desc: `An encoder & decoder for "cryptic" fonts. BirbText and AlienText fonts made by Deborah#6709 based on the symbols designed by Creator Ink and The Game Theorists.`,
            platforms: {
                web: {
                    versions: {
                        "v1.2.0": {
                            index: 1
                        }, "v1.1.2": {
                            index: 0
                        }
                    }
                }
            },
            lastUpdated: 1563202271
        },
        "tessellation-creator": {
            title: "Tessellation Creator",
            platforms: {
                web: {
                    versions: {
                        "v1.0.0": {
                            index: 0
                        }
                    }
                }
            },
            lastUpdated: 1563202271
        },
        "word-search-cheats": {
            title: "Word Search Cheats",
            desc: "Do word searches instantly",
            platforms: {
                web: {
                    versions: {
                        "v1.0.0": {
                            index: 0
                        }
                    }
                }
            },
            lastUpdated: 1563202271
        },
        "word-search-cheats-ocr": {
            title: "Word Search Cheats OCR",
            desc: `Do word searches INSTANTLY! Now with OCR. To begin, upload an image. Then, crop the image to JUST the letter of the word search. Then, hit the ""recognize" button, wait. Then, ensure the recognized text is correct, if not, change it. Hit "tab" and then enter the search terms on the following screen. When finished, hit tab again. The next screen will then show you the results of the word search. REMEMBER, the coordinates for the letters start at ZERO. X goes right and Y goes down. Press tab again to display the word search with the found words highlighted.`,
            platforms: {
                web: {
                    versions: {
                        "v1.0.0": {
                            index: 0
                        }
                    }
                }
            },
            lastUpdated: 1563202271
        }
    },
    socials: [
        {
            title: "YouTube",
            href: "https://www.youtube.com/channel/UChXdVQ8mm8UQBir87KaRgTQ"
        },
        {
            title: "DLive",
            href: "https://dlive.tv/ClaytonDoesThings"
        },
        {
            title: "Patreon",
            href: "https://www.patreon.com/ClaytonDoesThings"
        },
        {
            title: "Github",
            href: "https://github.com/ClaytonDoesThings/ClaytonXYZ"
        },
        {
            title: "Discord",
            href: "https://discordapp.com/invite/nSGT8BJ"
        },
        {
            title: "Instagram",
            href: "https://www.instagram.com/claytondoesthings/"
        },
        {
            title: "Twitter",
            href: "https://twitter.com/ClaytonsThings"
        }
    ]
}

var legacyRoutes = [
    [
        '/games/othcXgpI9PNqBt3aY5AX',
        '/w/games/arc-plat'
    ],
    [
        '/games/2HbTB1akfOrcKvPc3klU',
        '/w/games/arc-plat'
    ],
    [
        '/games/SrfvRpIl5K2dvoQyaRDr',
        '/w/games/carai'
    ],
    [
        '/games/cFCb44HSul7ydovmyqm0',
        '/w/games/demonic-conquest'
    ],
    [
        '/games/Zi1l6UGwnqyZhAEKkekH',
        '/w/games/dig-it'
    ],
    [
        '/games/ZmEAX6ahcJmtPne2cJT5',
        '/w/games/russian-roulette'
    ],
    [
        '/games/NoeJACBZ7L6GPyxaiV2o',
        '/w/games/tetris'
    ],
    [
        '/games/Kjwl3N49rt3JHO9wQumj',
        '/w/games/the-giver-the-game'
    ],
    [
        '/games',
        '/w/games'
    ],
    [
        '/software/vb3kiylD5juse5xAelMQ',
        '/w/software/calculator-the-game-cheats'
    ],
    [
        '/software/ewwNONFTbeoPq607TgFc',
        '/w/software/comcode-translator'
    ],
    [
        '/software/B4cXi8BOIS3Tmu9kTH55',
        '/w/software/legitimate-images-made-from-images'
    ],
    [
        '/software/1Jv03Dpex8vMMdQDkmjH',
        '/w/software/symbol-translator'
    ],
    [
        '/software/tvyPtYy0lmITI5uv6uFx',
        '/w/software/tessellation-creator'
    ],
    [
        '/software/3kJxqfLU7XQoOE3GwfXs',
        '/w/software/word-search-cheats'
    ],
    [
        '/software/G2GFOL958ihQwP3Ds3X7',
        '/w/software/word-search-cheats-ocr'
    ],
    [
        '/software',
        '/w/software'
    ]
]

var _legacyRoutes = [];

for (let i in legacyRoutes) {
    _legacyRoutes.push(legacyRoutes[i][0])
    _legacyRoutes.push(legacyRoutes[i][0] + "/*");
}
console.log(_legacyRoutes);

var modules = {
    favicon: function () {
        return `<link rel="icon" href="/favicon.ico">`;
    },
    styles: function () {
        return `<link href="/s/styles.css" rel="stylesheet" type="text/css" />`;
    },
    ad: function () {
        return adsterra728x90Key ? `<hr><p><i>Theses ads help support the site:</i></p>
        <script type="text/javascript">
            atOptions = {
                'key' : '${adsterra728x90Key}',
                'format' : 'iframe',
                'height' : 90,
                'width' : 728,
                'params' : {}
            };
            document.write('<scr' + 'ipt type="text/javascript" src="http' + (location.protocol === 'https:' ? 's' : '') + '://www.bcloudhost.com/${adsterra728x90Key}/invoke.js"></scr' + 'ipt>');
        </script>
        <p>To better support the site, consider subscribing to our <a href="https://www.patreon.com/ClaytonDoesThings">Patreon</a>.</p>` : '';
    },
    topNav: function () {
        return `
            ${googleAnalyticsID ? `<!-- Global site tag (gtag.js) - Google Analytics -->
            <script async src="https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsID}"></script>
            <script>
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('config', '${googleAnalyticsID}');
            </script>` : ''}
            
            <ul class="horizontal-list">
                <li><a href="/w/home">Home</a></li>
                <li><a href="/w/games">Games</a></li>
                <li><a href="/w/software">Tools & Software</a></li>
                ${(
                    function () {
                        let r = "";
                        for (let i = db.socials.length-1; i >= 0; i--) {
                            r += `<li style="float: right;"><a href="${db.socials[i].href}" target="_blank"><img alt="${db.socials[i].title}" src="/s/logos/${db.socials[i].title}-logo-color.png"/></a></li>`;
                        }
                        return r;
                    }
                )()}
            </ul>
        `;
    }
}

function htmlPage(head, body, title="Clayton Does Things XYZ", meta) {
    var metaS = `
        <Meta charset="UTF-8">
        <Meta name="viewport" content="width=device-width, initial-scale=1.0">
    `;
    for (let i in meta) {
        let metaT = "<Meta ";
        for (let j in meta[i]) {
            metaT += `${j}="${meta[i][j]}"`;
        }
        metaS += metaT+">";
    }
    var toSend = `<html><head><title>${title}</title>${metaS}${head}</head><body>${body}</body></html>`
    return toSend;
}

function pathToSitemap (path, freq, priority) {
    return (`<url><loc>https://claytondoesthings.xyz${path}</loc><changefreq>${freq}</changefreq><priority>${priority}</priority></url>`);
}

app.get(_legacyRoutes, (req, res) => {
    console.log(`${req.ip} requested ${req.url} which is a legacy route. They were refered by ${req.get('Referrer')}`);
    let targetRoute = "";
    for (let i in _legacyRoutes) {
        if ((new RegExp(_legacyRoutes[i])).test(req.url)) {
            targetRoute = legacyRoutes[Math.floor(i/2)][1];
            break;
        }
    }
    res.send(htmlPage(
        modules.favicon() +
        modules.styles(),
        `<h1>IMPORTANT!</h1>
        <h3 style="color: red;">The route you have requested is now a legacy route. It's function is no longer guranteed in the future. If you have gotten here through a link, PLEASE contact the referrer to get them to update the link. Otherwise, please update your bookmarks or remember the new path.</h3>
        <h4><a href="${targetRoute}">--> Proceed to page <--</a></h4>
        `
    ));
});

app.get("/sitemap.xml", (req, res) => {
    let r = `<?xml version="1.0" encoding="UTF-8"?>`;
    r += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;
    r += pathToSitemap("/w/home", "monthly", 1);
    r += pathToSitemap("/w/games", "monthly", 0.9);
    for (let i in db.games) {
        r += pathToSitemap(`/w/games/${i}`, "weekly", 0.8);
        for (let j in db.games[i].platforms) {
            let index = j === "web" ? "/index.html" : "";
            r += pathToSitemap(`/w/games/${i}/${j}${index}`, "weekly", 0.7);
            for (let k in db.games[i].platforms[j].versions) {
                r += pathToSitemap(`/w/games/${i}/${j}${index}?version=${k}`, "monthly", 0.6);
            }
        }
    }
    r += pathToSitemap("/w/software", "monthly", 0.9);
    for (let i in db.software) {
        r += pathToSitemap(`/w/software/${i}`, "weekly", 0.8);
        for (let j in db.software[i].platforms) {
            let index = j === "web" ? "/index.html" : "";
            r += pathToSitemap(`/w/software/${i}/${j}${index}`, "weekly", 0.7);
            for (let k in db.software[i].platforms[j].versions) {
                r += pathToSitemap(`/w/software/${i}/${j}${index}?version=${k}`, "monthly", 0.6);
            }
        }
    }
    r += "</urlset>";
    res.type("application/xml").send(r);
});

app.get("/favicon.ico", (req, res) => {
    res.sendFile(__dirname + "/s/favicon.ico");
})

app.get("/s/*", (req, res) => {
    let p = `${__dirname}${req.url.replace("%20", ' ')}`;
    if (fs.existsSync(p)) {
        res.sendFile(p);
    } else {
        console.log(`File ${p} does not exist`);
        res.redirect("/404");
    }
});

app.get("/404", (req, res) => {
    res.sendFile("w/404.html", {root: __dirname});
});

app.get(["/", "/w", "/w/home"], (req, res) => {
    res.send(htmlPage(
        modules.favicon() +
        modules.styles(),
        modules.topNav() +
        `
            <div style="width:60%; margin-left:auto; margin-right:auto; text-align:center;">
            <h1 align="center"><b><u>Home</u></b></h1>
            <p align="center">Welcome to the homepage of Clayton Does Things!</p>
            <hr/>
            <p>Remember to follow our socials!</p>
            ${(
                function () {
                    let r = "";
                    for (let i in db.socials) {
                        r += `<a href="${db.socials[i].href}" target="_blank"><img alt="${db.socials[i].title}" src="/s/logos/${db.socials[i].title}-logo-color.png" style="margin: 6px; height: 50px"/></a>`;
                    }
                    return r;
                }
            )()}
            </div>
        ` +
        modules.ad(),
        "Home | Clayton Does Things XYZ"
    ));
});

app.get(["/w/games", "/w/software"], (req, res) => {
    var type = req.url.split("/")[2].toLowerCase();
    var typeStylized = type.charAt(0).toUpperCase() + type.slice(1);
    res.send(htmlPage(
        modules.favicon() +
        modules.styles(),
        modules.topNav() +
        `
            <h1 align="center"><u>${typeStylized}</u></h1>
            <ul class="vertical-list">
                ${(function () {
                    var r = "";
                    for (let i in db[type]) {
                        r += `<li style="padding-left: 10px; padding-right: 10px;"><a style="display: inline; padding: 0px 0px; font-size: 32px;" href="/w/${type}/${i}">${db[type][i].title}</a>${Object.keys(db[type][i].platforms).indexOf("web") !== -1 ? `<a style="display: inline; padding: 0px 0px; float: right; background-color: #0fdb42; font-size: 32px;" href="/w/${type}/${i}/web">  Play Now  </a>` : ""}</li>`
                    }
                    return r;
                })()}
            </ul>
        ` +
        modules.ad(),
        `${typeStylized} | Clayton Does Things XYZ`
    ));
});

app.get(["/w/games/:id", "/w/software/:id"], (req, res) => {
    var type = req.url.split("/")[2].toLowerCase();
    var item = db[type][req.params.id];
    if (item !== undefined) {
        res.send(htmlPage(
            modules.favicon() +
            modules.styles(),
            modules.topNav() +
            `
                <div style="width:60%; margin-left:auto; margin-right:auto; text-align:center;">
                    <h1 align="center"><u>${item.title}</u></h1>
                    <p>${item.desc ? item.desc : ""}</p>
                    ${Object.keys(item.platforms).indexOf("web") !== -1 ?
                        `<a style="text-align: center; font-size: 32px; color: black; text-decoration: none; background-color: #0fdb42; padding: 4px; margin: 4px" href="/w/${type}/${req.params.id}/web">Play Now</a>` :
                        ""
                    }
                    ${
                        item.platforms ? (`<hr><h2 align="center"><u>Downloads</u></h2>
                            ${(function () {
                                r = ""
                                for (let i in item.platforms) {
                                    if (Object.keys(item.platforms[i].versions).length > 0) {
                                        r += `<h3><a href="/w/${type}/${req.params.id}/${i === "web" ? `web/index.html` : i}">${i.charAt(0).toUpperCase() + i.slice(1)}</a></h3>
                                        <ul style="border:none" class="vertical-list">`;
                                        for (let j in item.platforms[i].versions) {
                                            r += `<li style="border:none;"><h4><u><a style="text-decoration-color: #3da5ff;" href="/w/${type}/${req.params.id}/${i === "web" ? `web/index.html` : i}?version=${j}">${j}</a></u></h4></li>`
                                        }
                                    }
                                    r += "</ul>";
                                }
                                return r;
                            })()}`
                        ) :
                        ""
                    }
                </div>
            ` +
            modules.ad(),
            `${item.title} | ${type.charAt(0).toUpperCase() + type.slice(1)} - Clayton Does Things XYZ`
        ));
    } else {
        res.redirect("/404");
    }
});

app.get(["/w/games/:id/:platform", "/w/games/:id/:platform/index.html", "/w/software/:id/:platform", "/w/software/:id/:platform/index.html"], (req, res) => {
    var type = req.url.split("/")[2].toLowerCase();
    var item = db[type][req.params.id];
    var urlVars = req.query;
    if (item !== undefined) {
        var platform = item.platforms[req.params.platform];
        if (platform !== undefined) {
            if (Object.keys(platform.versions).length > 0 && (urlVars.version !== undefined ? platform.versions[urlVars.version] !== undefined : true)) {
                var version = urlVars.version !== undefined ? platform.versions[urlVars.version] : platform.versions[Object.keys(platform.versions)[0]];
                if (req.params.platform === "web") {
                    if ((req.url.indexOf('?') !== -1 ? req.url.slice(0, req.url.indexOf('?')) : req.url).endsWith("/index.html")) {
                        var basePath = `${__dirname}/w/${type}/${req.params.id}/${req.params.platform}/${urlVars.version || Object.keys(platform.versions)[0]}`;
                        res.send(htmlPage(
                            modules.favicon() +
                            modules.styles() +
                            fs.readFileSync(basePath + ".head", "utf8"),
                            modules.topNav() +
                            `<h1><u><a href="/w/${type}/${req.params.id}">${item.title}</a></u></h1>${urlVars.version ? `<p class="subtext">You are currently viewing a specific version of this program. Thefore, this link my not be up-to-date. To always have the latest version, go <a href="/w/${type}/${req.params.id}/${req.params.platform}/index.html">here</a>.</p>` : ""}<p>${item.desc}</p><hr>` +
                            fs.readFileSync(basePath + ".body", "utf8") +
                            modules.ad(),
                            `${item.title} ${req.params.platform.charAt(0).toUpperCase() + req.params.platform.slice(1)}${urlVars.version ? `[${urlVars.version}]` : ""} | ${type.charAt(0).toUpperCase() + type.slice(1)} - Clayton Does Things XYZ`
                        ));
                    } else {
                        var redirectUrl = `/w/${type}/${req.params.id}/${req.params.platform}/index.html`;
                        console.log(`${req.url} is redirecting to ${redirectUrl}`)
                        res.redirect(redirectUrl);
                    }
                } else {
                    res.download(`${__dirname}/s/${type}/${req.params.id}/${req.params.platform}/${urlVars.version || Object.keys(platform.versions)[0]}/${version.fileName}`)
                }
            } else {
                console.log(req.url + " contains a bad version.");
                res.redirect("/404");
            }
        } else {
            console.log(req.url + " contains a bad platform.");
            res.redirect("/404");
        }
    } else {
        console.log("Bad ID");
        res.redirect("/404");
    }
});

app.get(["/w/games/:id/:platform/*", "/w/software/:id/:platform/*"], (req, res) => {
    var type = req.url.split("/")[2].toLowerCase();
    var item = db[type][req.params.id];
    var urlVars = req.query;
    if (item !== undefined) {
        var platform = item.platforms[req.params.platform];
        if (platform !== undefined && req.params.platform === "web") {
            if (Object.keys(platform.versions).length > 0 && (urlVars.version !== undefined ? platform.versions[urlVars.version] !== undefined : true)) {
                var version = urlVars.version !== undefined ? platform.versions[urlVars.version] : platform.versions[Object.keys(platform.versions)[0]];
                var basePath = `/w/${type}/${req.params.id}/${req.params.platform}`;
                var filePath = `${__dirname}/s/${type}/${req.params.id}/${req.params.platform}/${urlVars.version || Object.keys(platform.versions)[0]}/${req.url.slice(basePath.length)}`;
                if (fs.existsSync(filePath)) {
                    res.sendFile(filePath);
                } else {
                    console.log(`File ${filePath} does not exist`);
                    res.redirect("/404");
                }
            } else {
                console.log(req.url + " contains a bad version.");
                res.redirect("/404");
            }
        } else {
            console.log(req.url + " contains a bad platform.");
            res.redirect("/404");
        }
    } else {
        console.log("Bad ID");
        res.redirect("/404");
    }
})

app.use(function (req, res, next) {
    console.log(`${req.ip} attempted to reach non-existant resource: ${req.url}`);
    res.redirect("/404");
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
});