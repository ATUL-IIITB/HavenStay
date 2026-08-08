const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js")
const userController = require("../controllers/user.js");


router.route("/signup")
    .get(wrapAsync(userController.renderSignupForm))
    .post(wrapAsync(userController.signupUser));

router.route("/login")
    .get(wrapAsync(userController.renderLoginForm))
    .post(
        saveRedirectUrl,
        passport.authenticate("local", {
            failureRedirect: "/login",
            failureFlash: true
        }),
        wrapAsync(userController.loginUser)
    );

router.get("/logout", wrapAsync(userController.logoutUser));


module.exports = router;