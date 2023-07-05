import { NextResponse } from 'next/server';

const { defaultResult } = require('@/utils');
const { CategoryPayloadSchema } = require('./schema');

export const validateCategoryPayload = (payload) => {
    const validationResult = CategoryPayloadSchema.validate(payload);
    if (validationResult.error) {
        return defaultResult(false, validationResult.error.message, null);
    }
    return defaultResult(true);
};
