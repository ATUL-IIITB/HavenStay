const express = require("express");
const router = express.Router({ mergeParams: true });
const Listing = require("../models/listing");
const wrapAsync = require("../utils/wrapAsync");
const expressError = require("../utils/expressError");
const { reviewSchema } = require("../Schema.js");
const Review = require("../models/review.js");


const validateReview = (req, res, next) => {
    if (!req.body) {
        return next(new expressError(400, "Request body is missing"));
    }
    let { error } = reviewSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(", ");
        return next(new expressError(400, errMsg));
    }
    next();
};

router.post("/", validateReview, async (req, res) => {
    let listing = await Listing.findById(req.params.id);

    let newReview = new Review(req.body.review);

    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();

    res.redirect(`/listings/${req.params.id}`);

});

router.delete("/:reviewId", wrapAsync(async (req, res) => {
    let { id, reviewId } = req.params;

    Listing.findByIdAndUpdate(id, { pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);

    res.redirect(`/listings/${id}`);

}));


module.exports = router;
