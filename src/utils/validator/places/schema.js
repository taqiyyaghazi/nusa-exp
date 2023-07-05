const Joi = require('joi');

export const PlacePayloadSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    mapsUrl: Joi.string().required(),
    address: Joi.string().required(),
    village: Joi.string().required(),
    subdistrict: Joi.string().required(),
    regency: Joi.string().required(),
    province: Joi.string().required(),
    photo: Joi.string().required(),
    filename: Joi.string().required(),
});
