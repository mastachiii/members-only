const db = require("../db/query");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

passport.use(
    new LocalStrategy(async (username, password, done) => {
        try {
            const user = await db.getUserByUsername(username);

            if (!user) return done(null, false, { message: "Incorrect Username" });

            return done(null, user);
        } catch (err) {
            done(err);
        }
    })
);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await db.getUserById(id);

        done(null, user);
    } catch (err) {
        done(err);
    }
});
