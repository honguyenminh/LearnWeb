const express = require("express");
const app = express();
const PORT = 3000;

// Always respond with this callback on ANY request to the server, no matter
// the path provided in the URL request. This also get prioritized over get(),...
// app.use((request, response) => {
//     response.send("Hello World!");
// })


// Response to GET request under given path
// This prioritize from top to bottom, so higher up gets more priority
app.get("/", (req, res) => {
    res.send("<h1>Hello World! From Express!</h1><p>Find the secret page...</p>");
});
app.get("/animals/:animal", (req, res) => {
    res.send(`<p>Did you say <b>${req.params.animal.toUpperCase()}</b>!!!`);
});
app.get("/secret", (req, res) => {
    res.send("<h1>Bingo!</h1>");
})
// Example of working with query
// the question mark thingy after a URL
app.get("/search", (req, res) => {
    // If no query named "q" was found, respond differently
    if (!req.query.q) {
        res.send("<h1>No query, no results</h1> - MDN");
        return;
    }
    res.send(`<h1>You searched for: ${req.query.q}`);
})

// If match none of known path above, 404 page :)
app.get("*", (req, res) => {
    res.send("<h1>404 not found!</h1><p>We can't find that page, check the URL maybe?</p>");
})

// Start listening on provided port
app.listen(PORT, () => {
    // On start/after started listening
    console.log("Listening on port " + PORT);
});