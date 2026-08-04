const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const {saveRedirectUrl} = require("../middleware.js")


router.get("/signup", async (req, res) => {
    res.render("./users/signup.ejs");
});


router.post("/signup", wrapAsync(async (req, res, next) => {
    try {
        let { username, email, password } = req.body;
        const newUser = new User({ username, email });
        const registeredUser = await User.register(newUser, password);
        console.log(registeredUser);
        req.login(registeredUser, (err) => {
            if (err) {
                return next();
            }
            req.flash("success", "Welcome To HeavenStays");
            res.redirect("/listings");
        });

    } catch (e) {
        console.log(e.message);      
        req.flash("error", e.message);

        req.session.save(() => {
            res.redirect("/signup");
        });
    }
}));

router.get("/login", async (req, res) => {
    res.render("./users/login.ejs");
});

router.post("/login",
    saveRedirectUrl,
    passport.authenticate("local", {
        failureRedirect: "/login",
        failureFlash: true
    }),
    async (req, res) => {
        req.flash("success", "Welcome , You Are Logged In");
        let redirectUrl = res.locals.redirectUrl ||"/listings"
        res.redirect(redirectUrl);
    });

router.get("/logout", async (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash("success", "You Are Logged Out !!!");
        res.redirect("/listings");
    });
});


module.exports = router;