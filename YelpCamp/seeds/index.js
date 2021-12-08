const totalOfSeeds = 50;

const mongoose = require("mongoose");
const Campground = require("../models/campground");
const cities = require("./cities");
const { places, descriptions } = require("./seedsHelper");

mongoose
    .connect("mongodb://localhost:27017/yelp-camp")
    .then(() => {
        console.log("MongoDB connection open");
    })
    .catch((e) => {
        console.log("MongoDB connection failed");
        console.log(e);
    });

const randomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];

async function seedDb() {
    // delete everything
    await Campground.deleteMany({});
    for (let i = 0; i < totalOfSeeds; i++) {
        const city = randomElement(cities);
        const camp = new Campground({
            location: city.city + ", " + city.state,
            title: randomElement(descriptions) + ' ' + randomElement(places),
        });
        await camp.save();
    }
    console.log("Done!");
}

seedDb().then(() => {
    mongoose.connection.close();
    process.exit();
});