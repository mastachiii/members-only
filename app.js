const express = require("express");

// Routes
const signUp = require("./routes/signUpRoutes");

const app = express();

app.set("view engine", "ejs");

// Middleware
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("<h1>Hello World</h1>");
});

app.use("/sign-up", signUp);

const PORT = process.env.port || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
