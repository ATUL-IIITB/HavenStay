const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js")
const userController = require("../controllers/user.js");


router.get("/signup", wrapAsync(userController.renderSignupForm));


router.post("/signup", wrapAsync(userControlller.signupUser));

router.get("/login", wrapAsync(userController.renderLoginForm));

router.post("/login",
    saveRedirectUrl,
    passport.authenticate("local", {
        failureRedirect: "/login",
        failureFlash: true
    }),
    wrapAsync(userController.loginUser));

router.get("/logout", wrapAsync(userController.logoutUser));


module.exports = router;