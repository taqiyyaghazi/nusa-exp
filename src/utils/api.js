import { JWT_SECRET_KEY } from '@/constant';
import { defaultResult, extractToken } from '.';
import { jwtVerify } from './jwt';

export const checkUserAuthenticated = async (auth) => {
    if (!auth) {
        return defaultResult(false, 'Anda harus login terlebih dahulu');
    }

    const token = extractToken(auth);

    if (!token) {
        return defaultResult(false, 'Token tidak valid');
    }
    const isValid = await jwtVerify(token, JWT_SECRET_KEY);

    if (!isValid.status) {
        return defaultResult(false, isValid.msg);
    }

    return defaultResult(isValid, 'User telah terautentikasi', isValid.data);
};
