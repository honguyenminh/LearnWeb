// Just a joke querier/generator
const giveMeAJoke = require("give-me-a-joke");
const colors = require("colors");
const readLine = require("readline");

giveMeAJoke.getRandomDadJoke((joke) => {
    console.log(joke.rainbow);
});
