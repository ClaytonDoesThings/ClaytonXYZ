const express = require('express'),
    path = require("path");

const app = express();
const port = process.env.PORT || 8080;

var modules = {
    defaultHead: function () {
        return "<link rel=\"icon\" href=\"/s/favicon.ico\">"
    }
}

function htmlPage(head, body) {
    return `<html><head>${head}</head><body>${body}</body></html>`
}

app.get("/s/favicon.ico", (req, res) => {
    res.sendFile("s/favicon.ico", {root: __dirname});
});

app.get(["/", "/w/home"], (req, res) => {
    res.send(htmlPage(modules.defaultHead(), `
        <h1>Home</h1>
        <body>Welcome to the homepage of Clayton Does Things!</body>
    `));
});

app.use(function (req, res, next) {
    console.log(`${req.ip} attempted to reach non-existant page: ${req.url}`);
    res.sendFile("w/404.html", {root: __dirname});
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
});