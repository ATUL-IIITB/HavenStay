const mongoose = require("mongoose");
const Listing = require("../models/listing.js");
const User = require("../models/user.js");
const initData = require("./data.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wonderlust";

main()
    .then(() => {
        console.log("MongoDB connected successfully");
        initDB();
    })
    .catch((err) => {
        console.log("Connection error:", err);
    });

async function main() {
    await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
    await Listing.deleteMany({});

    const demoUser = await User.findOne({ username: "demo" });

    if (!demoUser) {
        throw new Error(
            "No user with username 'demo' found. Please create one first."
        );
    }

    const data = initData.data.map((obj) => ({
        ...obj,
        owner: demoUser._id,
    }));

    await Listing.insertMany(data);

    console.log("Database Initialized Successfully");
    mongoose.connection.close();
};