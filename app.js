const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

app.use(methodOverride("_method"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.engine('ejs',ejsMate);
const MONGO_URL = "mongodb://127.0.0.1:27017/wonderlust";

main()
    .then(() => {
        console.log("MongoDB connected successfully");
    })
    .catch((err) => {
        console.log("Connection error:", err);
    });

async function main() {
    await mongoose.connect(MONGO_URL);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.listen(8080, () => {
    console.log("App Is Listening at Port 8080");
});

app.get("/", (req, res) => {
    res.send("App is running");
});

app.get("/listings", async (req, res) => {
    try {
        const allListings = await Listing.find({});
        res.render("listings/index", { allListings });
    } catch (err) {
        console.log(err);
        res.status(500).send("Database error");
    }
});

app.get("/listings/new", (req, res) => {
    res.render("listings/new");
});

app.post("/listings", async (req, res) => {
    const newListing = new Listing(req.body);
    await newListing.save();
    res.redirect("/listings");
});

app.get("/listings/:id", async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show", { listing });
});

app.get("/listings/:id/edit", async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit", { listing });
});

app.put("/listings/:id", async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, req.body);
    res.redirect(`/listings/${id}`);
});

app.delete("/listings/:id", async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
});