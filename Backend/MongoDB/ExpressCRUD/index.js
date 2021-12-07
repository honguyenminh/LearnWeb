const PORT = 3000;
const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require("method-override");

const Product = require("./models/product");
const categories = Product.schema.obj.category.enum;

mongoose
    .connect("mongodb://localhost:27017/shopApp")
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
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.get("/products", async (req, res) => {
    const { category } = req.query;
    if (category) {
        const products = await Product.find({ category });
        res.render("products/index", { products, category });
        return;
    }
    const products = await Product.find();
    res.render("products/index", { products, category: null });
});

app.post("/products", async (req, res) => {
    const product = new Product(req.body);
    await product.save();
    res.redirect("/products/" + product._id);
});

app.get("/products/new", (req, res) => {
    res.render("products/new");
});

app.get("/products/:id", async (req, res) => {
    const product = await Product.findById(req.params.id);
    res.render("products/show", { product });
});

app.put("/products/:id", async (req, res) => {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {runValidators: true});
    res.redirect("/products/" + product._id);
});

app.get("/products/:id/edit", async (req, res) => {
    const product = await Product.findById(req.params.id);
    res.render("products/edit", { product, categories });
});

app.delete("/products/:id", async (req, res) => {
    await Product.findByIdAndDelete(req.params.id);
    res.redirect("/products");
});

app.listen(PORT, () => {
    console.log("Listening on port " + PORT);
});
