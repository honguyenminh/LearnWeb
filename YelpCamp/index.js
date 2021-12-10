const PORT = 3000;
const path = require("path");
const express = require("express");
const mongoose = require("mongoose");

const Campground = require("./models/campground");

const app = express();
mongoose
    .connect("mongodb://localhost:27017/yelp-camp")
    .then(() => {
        console.log("MongoDB connection open");
    })
    .catch((e) => {
        console.log("MongoDB connection failed");
        console.log(e);
    });

const absPath = (relPath) => path.join(__dirname, relPath);

app.set("view engine", "ejs");
app.set("views", absPath("views"));
app.use(express.static(absPath("public")));

app.get("/", (req, res) => {
    // TODO: add this page
    res.send("Hello World!");
});

app.get("/campgrounds", async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render("campgrounds/index", { campgrounds });
});

app.get("/campgrounds/:id", async (req, res) => {
    const campgrounds = await Campground.findById(req.query.id);
    res.render("campgrounds/index", { campgrounds });
});

// 404 not found page
app.get("*", (req, res) => {
    res.statusCode = 404;
    // TODO: make this page
    res.render("not-found.ejs", { page: req.baseUrl + req.path });
});

app.listen(3000, () => {
    console.log("Server started on port 3000");
});
