// This will fake a comment database
// ! NOTE: the data WILL BE RESET after server shutdown.

const express = require("express");
const path = require("path");
const methodOverride = require("method-override");

const app = express();
const PORT = 3000;
const absPath = (relPath) => path.join(__dirname, relPath);

app.set("view engine", "ejs");
app.set("views", absPath("views"));
app.use(express.static(absPath("public")));

// POST parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Method override, because HTML form is stupid
app.use(methodOverride("_method"));

const comments = require("./comments.json");

// GET route to retrieve all comment with HTML
app.get("/comments", (req, res) => {
    const { state } = req.query;
    let msg;
    if (state) {
        if (state == "submit") msg = "Comment submitted";
        else if (state == "edit") msg = "Comment edited";
        else if (state == "delete") msg = "Comment deleted";
        else if (state == "404") msg = "Comment not found or ID is not valid";
        // TODO: add more message here as needed
    }
    res.render("comments/index.ejs", { comments, msg });
});

// GET route to create new comment with HTML
app.get("/comments/new", (_req, res) => {
    res.render("comments/new.ejs");
});

// GET route to show details of a comment with HTML
// * NOTE: Currently using array index to identify just for demo purpose (i mean it works)
// * but you should use the "uuid" npm package to make IDs in your projects
app.get("/comments/:id", (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id) || id < 0 || id >= comments.length) {
        res.redirect("/comments?state=404");
    } else {
        const comment = comments[id];
        res.render("comments/details.ejs", { comment, id });
    }
});

// GET route to edit a comment with HTML
app.get("/comments/:id/edit", (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id) || id < 0 || id >= comments.length) {
        res.redirect("/comments?state=404");
    } else {
        const comment = comments[id];
        res.render("comments/edit.ejs", { id, comment });
    }
});

// POST route to create new comment
app.post("/comments", (req, res) => {
    const { name, comment } = req.body;
    if (name && comment) {
        comments.push({ author: name, text: comment });
        res.redirect("/comments?state=submit");
    } else {
        res.send("Invalid comment");
    }
});

// PATCH route to update a comment
// ! This is a bad idea without any authentication, but eh
app.patch("/comments/:id", (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id) || id < 0 || id >= comments.length) {
        res.redirect("/comments?state=404");
    } else {
        comments[id].text = req.body.comment;
        res.redirect("/comments?state=edit");
    }
});

// DELETE route to delete a comment
// ! Same as PATCH route above
app.delete("/comments/:id", (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id) || id < 0 || id >= comments.length) {
        res.redirect("/comments?state=404?_method=GET");
    } else {
        comments.splice(id, 1);
        res.redirect("/comments?_method=GET&state=delete");
    }
});

app.get("/", (_req, res) => {
    res.send("<h1>REST example</h1><a href='/comments'>View comments</a>");
});

// 404 not found page
app.get("*", (req, res) => {
    res.statusCode = 404;
    res.render("not-found.ejs", { page: req.baseUrl + req.path });
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
