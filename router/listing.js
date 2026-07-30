const express = require("express");
const router = express.Router();
const Listing = require("../models/listing");
const wrapAsync = require("../utils/wrapAsync");
const expressError = require("../utils/expressError");
const { listingSchema} = require("../Schema.js");


const validateListing = (req, res, next) => {
    if (!req.body) {
        return next(new expressError(400, "Request body is missing"));
    }
    let { error } = listingSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(", ");
        return next(new expressError(400, errMsg));
    }
    next();
};


router.get("/", wrapAsync(async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index", { allListings });
}));
router.get("/new", (req, res) => {
    res.render("listings/new");
});

router.get("/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id).populate("reviews");
    if (!listing) throw new expressError(404, "Listing not found");
    res.render("listings/show", { listing });
}));


router.get("/:id/edit", wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) throw new expressError(404, "Listing not found");
    res.render("listings/edit", { listing });
}));

router.post("/", validateListing, wrapAsync(async (req, res) => {
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    req.flash("success","New Listing Created !!!");
    res.redirect("/listings");
}));



router.put("/:id", validateListing, wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, req.body.listing);
    req.flash("success","Listing updated !!!");
    res.redirect(`/listings/${id}`);
}));

router.delete("/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success"," Listing Deleted !!!");
    res.redirect("/listings");
}));


module.exports = router;