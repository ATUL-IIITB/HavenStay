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
const initDB = async ()=>{
    await listing.deleteMany({});
    initdata.data = initdata.data.map((obj)=>({
      ...obj,owner : "6a71e1e8b626b7688f47e58e",
    }));
    await listing.insertMany(initdata.data);
    console.log("Data Initialized");
};
initDB();