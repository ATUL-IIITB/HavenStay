const Listing = require("../models/listing");
const expressError = require("../utils/expressError");

module.exports.index = async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index", { allListings });
};

module.exports.renderNewForm = async (req, res) => {
    res.render("listings/new");
};

module.exports.showListing = async (req, res) => {
    let { id } = req.params;

    const listing = await Listing.findById(id)
        .populate({
            path: "reviews",
            populate: {
                path: "author",
            },
        })
        .populate("owner");

    if (!listing) {
        throw new expressError(404, "Listing not found");
    }

    res.render("listings/show", { listing });
};

module.exports.renderEditForm = async (req, res) => {
    let { id } = req.params;

    const listing = await Listing.findById(id);

    if (!listing) {
        throw new expressError(404, "Listing not found");
    }

    res.render("listings/edit", { listing });
};

module.exports.createListing = async (req, res) => {
    const newListing = new Listing(req.body.listing);

    newListing.owner = req.user._id;

    // Save Cloudinary image correctly
    if (req.file) {
        newListing.Image = {
            url: req.file.path,
            fileName: req.file.filename,
        };
    }

    await newListing.save();

    req.flash("success", "New Listing Created !!!");
    res.redirect("/listings");
};

module.exports.updateListing = async (req, res) => {
    let { id } = req.params;

    let listing = await Listing.findByIdAndUpdate(
        id,
        req.body.listing,
        {
            new: true,
            runValidators: true,
        }
    );

    if (!listing) {
        throw new expressError(404, "Listing not found");
    }

    if (req.file) {
        listing.Image = {
            url: req.file.path,
            fileName: req.file.filename,
        };

        await listing.save();
    }

    req.flash("success", "Listing updated !!!");
    res.redirect(`/listings/${id}`);
};

module.exports.deleteListing = async (req, res) => {
    let { id } = req.params;

    await Listing.findByIdAndDelete(id);

    req.flash("success", "Listing Deleted !!!");
    res.redirect("/listings");
};