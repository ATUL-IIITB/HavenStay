const joi = require("joi");

module.exports.listingSchema = joi.object({
    listing: joi.object({
        name:        joi.string().required(),
        description: joi.string().required(),
        location:    joi.string().required(),
        Image:       joi.string().allow("", null), 
        price:       joi.number().required().min(0),
    }).required()
});