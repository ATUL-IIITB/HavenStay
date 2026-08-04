const mongoose = require("mongoose");
const listing = require("../models/listing.js");
const initdata = require("./data.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wonderlust";

main()
  .then(() => {
    console.log('MongoDB connected successfully');
  })
  .catch((err) => {
    console.log('Connection error:', err);
  });

async function main(){
    await mongoose.connect(MONGO_URL);
}
// init/index.js
const initDB = async () => {
    await listing.deleteMany({});

    const demoUser = await User.findOne({ username: "demo" });
    if (!demoUser) {
        throw new Error("No 'demo' user found — create one via /signup first");
    }

    initdata.data = initdata.data.map((obj) => ({
        ...obj,
        owner: demoUser._id,
    }));

    await listing.insertMany(initdata.data);
    console.log("Data Initialized");
};
initDB();
