import { JWT_EXPIRED_AGE, JWT_SECRET_KEY, SALT_ROUNDS } from '@/constant';
import UsersService from '@/services/mysql/UsersService';
import {
    BadRequestError,
    SuccessCreated,
    SuccessOK,
} from '@/utils/httpResponse';
import { jwtSign } from '@/utils/jwt';
import {
    validateUserLoginPayload,
    validateUserPayload,
} from '@/utils/validator/users';
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const usersService = new UsersService();

export async function POST(request) {
    const req = await request.json();

    const { status, msg } = validateUserLoginPayload(req);

    if (!status) {
        return BadRequestError(msg);
    }

    const { password, email } = req;
    const user = await usersService.getUserByEmail(email);

    if (!user.status) {
        return BadRequestError(user.msg);
    }

    const { password: passwordHashed } = user.data;

    const isValidPassword = await bcrypt.compare(password, passwordHashed);

    if (!isValidPassword) {
        return BadRequestError('Email dan password tidak valid!');
    }

    const token = await jwtSign(user.data, JWT_SECRET_KEY, JWT_EXPIRED_AGE);

    const res = SuccessOK('Berhasil login!', {...user.data, password: undefined});
    res.cookies.set('token', token);
    return res;
}
