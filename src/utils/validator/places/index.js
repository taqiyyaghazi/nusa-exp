const { defaultResult } = require('@/utils');
const { PlacePayloadSchema } = require('./schema');

export const validatePlacePayload = (payload) => {
    const validationResult = PlacePayloadSchema.validate(payload);
    if (validationResult.error) {
        return defaultResult(false, validationResult.error.message, null);
    }
    return defaultResult(true);
};
