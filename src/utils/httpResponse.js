import { NextResponse } from 'next/server';
import { defaultResult } from '.';

export const BadRequestError = (msg) => {
    return NextResponse.json(defaultResult(false, msg), { status: 400 });
};

export const InternalServerError = (msg) => {
    return NextResponse.json(defaultResult(false, msg), { status: 500 });
};

export const SuccessCreated = (msg, data) => {
    return NextResponse.json(defaultResult(true, msg, data), { status: 201 });
};

export const SuccessOK = (msg, data) => {
    return NextResponse.json(defaultResult(true, msg, data), { status: 200 });
};
