const mongoose = require("mongoose");

mongoose
    .connect("mongodb://localhost:27017/moviesApp")
    .then(() => {
        console.log("Connection open");
    })
    .catch((e) => {
        console.log("Connection failed");
        console.log(e);
    });

const movieSchema = new mongoose.Schema({
    title: String,
    year: Number,
    score: Number,
    rating: String,
});

const Movie = mongoose.model("Movie", movieSchema);
// Create new model, but doesn't save
const amadeus = new Movie({ title: "Amadeus", year: 1986, score: 9, rating: "R" });
// Actually save it
amadeus.save();