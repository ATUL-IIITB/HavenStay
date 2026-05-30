const joi = require("joi");
const listing = require("./models/listing");
module.exports.listingSchema = joi.object({
    listing : joi.object(
        {
            name : joi.string().required(),
            description : joi.string().required(),
            location : joi.string().required(),
            image : joi.string().allow("",NULL),
            price : joi.number().required()
        }
    ).required()
});