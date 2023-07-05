const Joi = require('joi');

export const CategoryPayloadSchema = Joi.object({
    name: Joi.string().required(),
});

