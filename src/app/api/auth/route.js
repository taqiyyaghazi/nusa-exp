import { NextResponse } from 'next/server';
const jwt = require('jsonwebtoken');

export async function POST(request) {
    const res = await request.json();
    const token = jwt.sign(
        { user_id: '12345' },
        'uytdutyduyfyurf6e6865r6rt78r676r65',
        {
            expiresIn: '2h',
        }
    );
    return NextResponse.json({ token });
}
