import { NextResponse } from 'next/server';

const { defaultResult } = require('@/utils');
const { UserPayloadSchema, UserLoginPayloadSchema } = require('./schema');

export const validateUserPayload = (payload) => {
    const validationResult = UserPayloadSchema.validate(payload);
    if (validationResult.error) {
        return defaultResult(false, validationResult.error.message, null);
    }
    return defaultResult(true);
};

export const validateUserLoginPayload = (payload) => {
    const validationResult = UserLoginPayloadSchema.validate(payload);
    if (validationResult.error) {
        return defaultResult(false, validationResult.error.message, null);
    }
    return defaultResult(true);
};
