// Create ASCII art from string
const figlet = require("figlet");
// Bring   c  o  l  o  r  s   to your console.log strings
const colors = require("colors");

// Basic hello world ASCII art
figlet("Hello World!", (e, result) => {
    if (e) {
        console.log("Uh oh, something went wrong!");
        console.dir(e);
        return;
    }
    console.log(result.rainbow);
});
