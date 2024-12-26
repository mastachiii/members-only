const express = require("express");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const PgStore = require("connect-pg-simple")(session);
const pool = require("./db/pool");
require("dotenv").config();

// Routes
const signUp = require("./routes/signUpRoutes");

const app = express();

// Session stuff
const sessionStore = new PgStore({
    pool,
    tableName: "sessions",
    createTableIfMissing: true,
});

app.use(
    session({
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: true,
        store: sessionStore,
        cookie: {
            maxAge: 120000, // Set cookies to 2 minutes for debugging purposes, will set to one day once ready for prod.
        },
    })
);


app.set("view engine", "ejs");

// Middleware
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("<h1>Hello World</h1>");
});

app.use("/sign-up", signUp);

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: err });
});

const PORT = process.env.port || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
