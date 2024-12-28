const express = require("express");
const session = require("express-session");
const PgStore = require("connect-pg-simple")(session);
const pool = require("./db/pool");
const passport = require("passport");
const passportConfig = require("./controllers/passport");
const authenticate = require("./routes/authMiddleware");
require("dotenv").config();

// Routes
const signUp = require("./routes/signUpRoutes");
const logIn = require("./routes/logRoutes");
const membership = require("./routes/membershipRoutes");
const message = require('./routes/messageRoutes')

const app = express();

app.set("view engine", "ejs");

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
            maxAge: 3600000, // Set cookies to 2 minutes for debugging purposes, will set to one day once ready for prod.
        },
    })
);

app.use(passport.authenticate("session"));

// Middleware
app.use(express.urlencoded({ extended: true }));

app.get("/", authenticate.isAuth, (req, res) => {
    res.render("indexAuthenticated", { username: req.user.username, isMember: req.user.is_member });
});

app.use("/", logIn);
app.use("/sign-up", signUp);
app.use("/secret", membership);
app.use("/message", message)

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: err });
});

const PORT = process.env.port || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
