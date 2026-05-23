const express = require("express");
const app = express();
const mongoose = require("mongoose");
const listing = require("./models/listing");

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


app.listen(8080,()=>{
    console.log("App Is Listening at Port 8080");
}); 

app.get("/",(req , res)=>{
    res.send("app Is running");
});

app.get("/addlisting",async (req,res)=>{
    let sampleListing = new listing({
            name: "Luxury Beach Villa 2",
            Image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
            price: 15000,
            location: "Goa",
            description: "Beautiful beachside villa with private pool and ocean view."
    });
    await sampleListing.save();
    console.log("Saved");
    res.send("Working Properly");
});
