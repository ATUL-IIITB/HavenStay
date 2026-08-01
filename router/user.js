const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");


router.get("/signup", async (req, res) => {
    res.render("./users/signup.ejs");
});


router.post("/signup", wrapAsync(async (req, res) => {
    try {
        let { username, email, password } = req.body;
        const newUser = new User({ username, email });
        const registeredUser = await User.register(newUser, password);
        console.log(registeredUser);
        req.flash("success", "Welcome To HeavenStays");
        res.redirect("/listings");
    } catch (e) {
        console.log(e.message);      // Should print the error
        req.flash("error", e.message);

        req.session.save(() => {
            res.redirect("/signup");
        });
    }
}));
module.exports = router;