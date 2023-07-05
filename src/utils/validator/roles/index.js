import { NextResponse } from 'next/server';

const { defaultResult } = require('@/utils');
const { RolePayloadSchema } = require('./schema');

export const validateRolePayload = (payload) => {
    const validationResult = RolePayloadSchema.validate(payload);
    if (validationResult.error) {
        return defaultResult(false, validationResult.error.message, null);
    }
    return defaultResult(true);
};
