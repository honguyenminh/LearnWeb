import express from "express";
import "colors";
import { join } from "path";
import { randomInt } from "crypto";

// Enable __dirname under ES module
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const PORT = 3000;
const pages = [];

app.set("view engine", "ejs");
// Ensure that we are using the correct views folder
app.set("views", join(__dirname, "views"));

pages.push("/random");
app.get(pages[pages.length - 1], (req, res) => {
    const num = randomInt(1, 100);
    res.render("random.ejs", { num });
});

pages.push("/r");
app.get(pages[pages.length - 1], (req, res) => {});

app.get("/", (req, res) => {
    res.render("home.ejs", { pages });
});

// 404 not found page
app.get("*", (req, res) => {
    res.render("not-found.ejs", { page: req.baseUrl + req.path });
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`.green);
});
