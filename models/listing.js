const mongoose = require("mongoose");
const review = require("./review.js");
const { object } = require("joi");
const Schema = mongoose.Schema;
const listingSchema = new Schema({
    name : {
        type : String,
        unique :true,
        required : true
    },
    Image : {
        type : String,
        set : (v) => 
            v === "" 
            ? "https://images.unsplash.com/photo-1777847349762-eb9027e61f69?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0fHx8ZW58MHx8fHx8" 
            :v,
        required : true
    },
    price : {
        type : Number,
        required : true
    },
    location :{
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    reviews : [
        {
            type : Schema.Types.ObjectId,
            ref : "Review",
        }
    ],
    
});

module.exports = mongoose.model( "listing",listingSchema);
