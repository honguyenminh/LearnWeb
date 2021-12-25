const PORT = 3000;
const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const ejsMate = require("ejs-mate");
const methodOverride = require("method-override");

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

app.engine('ejs', ejsMate);
app.set("view engine", "ejs");
app.set("views", absPath("views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(absPath("public")));
app.use(methodOverride("_method"));

app.get("/", (req, res) => {
    // TODO: add this page
    res.send("Hello World!");
});

app.get("/campgrounds", async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render("campgrounds/index", { campgrounds });
});

app.get("/campgrounds/new", (req, res) => {
    res.render("campgrounds/new");
});

app.post("/campgrounds", async (req, res) => {
    const campground = new Campground(req.body.campground);
    await campground.save();
    res.redirect(`/campgrounds/${campground._id}`);
});

app.put("/campgrounds/:id", async (req,res) => {
    await Campground.findByIdAndUpdate(req.params.id, { ...req.body.campground });
    res.redirect("/campgrounds/" + req.params.id);
})

app.delete("/campgrounds/:id", async  (req, res) => {
    await Campground.findByIdAndDelete(req.params.id);
    res.redirect("/campgrounds");
})

app.get("/campgrounds/:id", async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    res.render("campgrounds/show", { campground });
});

app.get("/campgrounds/:id/edit", async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    res.render("campgrounds/edit", { campground });
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
