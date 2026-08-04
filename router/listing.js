const express = require("express");
const router = express.Router();
const Listing = require("../models/listing");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");



router.get("/", wrapAsync(async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index", { allListings });
}));
router.get("/new", isLoggedIn, (req, res) => {

    res.render("listings/new");
});

router.get("/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id).populate({ path: "reviews", populate: { path: "author" } }).populate("owner");
    if (!listing) throw new expressError(404, "Listing not found");
    res.render("listings/show", { listing });
}));


router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) throw new expressError(404, "Listing not found");
    res.render("listings/edit", { listing });
}));

router.post("/", isLoggedIn, validateListing, wrapAsync(async (req, res) => {
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    await newListing.save();

    req.flash("success", "New Listing Created !!!");
    res.redirect("/listings");
}));


router.put("/:id", isLoggedIn, isOwner, validateListing, wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, req.body.listing);
    req.flash("success", "Listing updated !!!");
    res.redirect(`/listings/${id}`);
}));

router.delete("/:id", isLoggedIn, isOwner, wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", " Listing Deleted !!!");
    res.redirect("/listings");
}));


module.exports = router;