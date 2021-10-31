const express = require("express");
require("colors");
const path = require("path");
const crypto = require("crypto");

const app = express();
const PORT = 3000;
const pages = [];

app.set("view engine", "ejs");
// Ensure that we are using the correct views folder
app.set("views", path.join(__dirname, "views"));

pages.push("/random");
app.get(pages[pages.length - 1], (_req, res) => {
    const num = crypto.randomInt(1, 100);
    res.render("random.ejs", { num });
});

pages.push("/r");
app.get(pages[pages.length - 1], (req, res) => {});

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
