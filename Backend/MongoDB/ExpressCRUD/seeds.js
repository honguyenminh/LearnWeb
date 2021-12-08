const mongoose = require("mongoose");

const Product = require("./models/product");

mongoose
    .connect("mongodb://localhost:27017/shopApp")
    .then(() => {
        console.log("MongoDB connection open");
    })
    .catch((e) => {
        console.log("MongoDB connection failed");
        console.log(e);
    });

const products = [
    {
        name: 'Nokia E72',
        price: 6969,
        category: 'phone'
    },
    {
        name: 'Samsung Galaxy S10',
        price: 8999,
        category: 'phone'
    },
    {
        name: 'Surface Pro',
        price: 12999,
        category: 'laptop'
    },
    {
        name: 'Samsung Galaxy Tab S3',
        price: 1999,
        category: 'tablet'
    },
    {
        name: 'Apple iPad',
        price: 3999,
        category: 'tablet'
    },
    {
        name: 'Apple AirPods',
        price: 1999,
        category: 'accessory'
    },
    {
        name: 'KZ KNS Pro',
        price: 199,
        category: 'accessory'
    }
]

async function seed() {
    await Product.deleteMany({});
    await Product.insertMany(products)
}

seed().then(() => {
    console.log("Done!");
    process.exit();
});