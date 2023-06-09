const Joi = require('joi');

export const RolePayloadSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
});

