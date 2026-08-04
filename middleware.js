const Listing = require("./models/listing.js");
const Review = require("./models/review");
const expressError = require("./utils/expressError");
const { listingSchema } = require("./Schema.js");
const { reviewSchema } = require("./Schema.js");

module.exports.isLoggedIn = async (req, res, next) => {

    if (!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "You Must Be Logged In to perform this operation.");
        return res.redirect("/login");
    }
    next();
}

module.exports.saveRedirectUrl = async (req, res, next) => {
    if (req.session.redirectUrl) {
        console.log(req.session.redirectUrl);
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
}

module.exports.isOwner = async (req, res, next) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    if (!listing.owner.equals(res.locals.currUser._id)) {
        req.flash("error", "You are not the Owner of this post");
        return res.redirect(`/listings/${id}`);
    }
    next();
}

module.exports.validateListing = (req, res, next) => {
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

module.exports.validateReview = (req, res, next) => {
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

module.exports.isReviewAuthor = async (req, res, next) => {

    const { id, reviewId } = req.params;

    const review = await Review.findById(reviewId);

    if (!review) {
        req.flash("error", "Review not found");
        return res.redirect(`/listings/${id}`);
    }

    if (!review.author.equals(req.user._id)) {
        req.flash("error", "You are not authorized.");
        return res.redirect(`/listings/${id}`);
    }

    next();
};