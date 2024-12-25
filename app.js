const express = require("express");

const app = express();

app.set("view engine", "ejs");

// MIDDLEWARE
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("<h1>Hello World</h1>");
});

app.get("/sign-up", (req, res) => {
    res.render("signUpForm");
});

app.post("/sign-up", (req, res) => {
    console.log(req.body);

    res.redirect("/");
});

const PORT = process.env.port || 8080;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
