import { defaultResult } from '.';

const jwt = require('jsonwebtoken');

export const jwtSign = (payload, secretKey, expiresIn) => {
    return new Promise((resolve, reject) => {
        jwt.sign(payload, secretKey, { expiresIn }, (err, token) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(token);
        });
    });
};

export const jwtVerify = (token, secretKey) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secretKey, (err, decoded) => {
            if (err) {
                resolve(defaultResult(false, 'Token tidak valid!'));
                return;
            }
            resolve(defaultResult(true, 'Token tidak valid!', decoded));
        });
    });
};
