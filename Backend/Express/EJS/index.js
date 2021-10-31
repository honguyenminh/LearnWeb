const express = require("express");
require("colors");
const path = require("path");
const crypto = require("crypto");

const app = express();
const PORT = 3000;
const pages = [];
const absPath = (relPath) => path.join(__dirname, relPath);

app.set("view engine", "ejs");
app.set("views", absPath("views"));
app.use(express.static(absPath("public")));

pages.push("/random");
app.get(pages[pages.length - 1], (_req, res) => {
    const num = crypto.randomInt(1, 100);
    res.render("random.ejs", { num });
});

// Reddit simulator
const redditData = require("./data.json");
pages.push("/r/:subreddit");
app.get(pages[pages.length - 1], (req, res) => {
    const {subreddit} = req.params;
    const data = redditData[subreddit];
    if (!data)
        res.render("not-found.ejs", { page: req.baseUrl + req.path });
    else res.render("reddit.ejs", { ...data })
});

app.get("/", (_req, res) => {
    res.render("home.ejs", { pages });
});

// 404 not found page
app.get("*", (req, res) => {
    res.render("not-found.ejs", { page: req.baseUrl + req.path });
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`.green);
});
