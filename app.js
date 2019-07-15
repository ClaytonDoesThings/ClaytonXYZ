const express = require('express'),
    path = require("path");

const app = express();
const port = process.env.PORT || 8080;

var db = {
    games: {
        "arc-2": {
            title: "Arc 2",
            desc: `Endless Arcade Game. You may need to press A+D (AT THE SAME TIME) for the game to actually start. The goal of the game is to get the highest score. To gain score, collect purple squares or clear a stage by hitting a pink square. You have two minutes to get as many points and stage clears as possible. To submit your score (only if using the CDT branch - currently), type your name in the box below the main player and hit "Submit High Score".`
        },
        "arc-plat": {
            title: "Arc Plat"
        },
        "carai": {
            title: "CarAI"
        },
        "dig-it": {
            title: "Dig It"
        },
        "tetris": {
            title: "Tetris"
        },
        "the-giver-the-game": {
            title: "The Giver - The Game"
        }
    },
    software: {
        "calculator-the-game-cheats": {
            title: "Calculator: The Game - Cheats"
        },
        "comcode-translator": {
            title: "ComCode Translator"
        },
        "legitimate-images-made-from-images": {
            title: "Legitimate Images Made From Images"
        },
        "symbol-translator": {
            title: "Symbol Translator"
        },
        "tessellation-creator": {
            title: "Tessellation Creator"
        },
        "word-search-cheats": {
            title: "Word Search Cheats"
        },
        "word-search-cheats-ocr": {
            title: "Word Search Cheats OCR"
        }
    }
}

var modules = {
    favicon: function () {
        return `
            <link rel="icon" href="/s/favicon.ico">
        `;
    },
    topNav: function () {
        return `
            <ul>
                <li><a href="/w/home">Home</a></li>
                <li><a href="/w/games">Games</a></li>
                <li><a href="/w/software">Tools & Software</a></li>
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

app.get("/s/favicon.ico", (req, res) => {
    res.sendFile("s/favicon.ico", {root: __dirname});
});

app.get("/404", (req, res) => {
    res.sendFile("w/404.html", {root: __dirname});
});

app.get(["/", "/w", "/w/home"], (req, res) => {
    res.send(htmlPage(
        modules.favicon(),
        modules.topNav() +
        `
            <h1>Home</h1>
            <body>Welcome to the homepage of Clayton Does Things!</body>
        `,
        "Home | Clayton Does Things XYZ"
    ));
});

app.get(["/w/games", "/w/software"], (req, res) => {
    var type = req.url.split("/")[2].toLowerCase();
    var typeStylized = type.charAt(0).toUpperCase() + type.slice(1);
    res.send(htmlPage(
        modules.favicon(),
        modules.topNav() +
        `
            <h1>${typeStylized}</h1>
            <ul>
                ${(function () {
                    var r = "";
                    for (let i in db[type]) {
                        r += `<li><a href="/w/${type}/${i}">${db[type][i].title}</a></li>`
                    }
                    return r;
                })()}
            </ul>
        `,
        `${typeStylized} | Clayton Does Things XYZ`
    ));
});

app.get(["/w/games/:id", "/w/software/:id"], (req, res) => {
    var type = req.url.split("/")[2].toLowerCase();
    var item = db[type][req.params.id];
    if (item !== undefined) {
        res.send(htmlPage(
            modules.favicon(),
            modules.topNav() +
            `
                <h1>${item.title}</h1>
                <p>${item.desc ? item.desc : ""}</p>
            `
        ));
    } else {
        res.redirect("/404");
    }
});

app.use(function (req, res, next) {
    console.log(`${req.ip} attempted to reach non-existant page: ${req.url}`);
    res.redirect("/404");
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
});