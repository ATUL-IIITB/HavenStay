const mongoose = require("mongoose");
const Review = require("./review.js");

const Schema = mongoose.Schema;

const listingSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true,
    },

    Image: {
        url: {
            type: String,
            default:
                "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1000",
        },
        fileName: {
            type: String,
            default: "default",
        },
    },

    price: {
        type: Number,
        required: true,
    },

    location: {
        type: String,
        required: true,
    },

    description: {
        type: String,
        required: true,
    },

    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review",
        },
    ],

    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
});

listingSchema.post("findOneAndDelete", async (listing) => {
    if (listing) {
        await Review.deleteMany({
            _id: { $in: listing.reviews },
        });
    }
});

module.exports = mongoose.model("listing", listingSchema);