var jwt = require('jsonwebtoken');

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
