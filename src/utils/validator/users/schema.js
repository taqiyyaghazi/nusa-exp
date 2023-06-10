const Joi = require('joi');

export const UserPayloadSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    role_id: Joi.number().required(),
});
