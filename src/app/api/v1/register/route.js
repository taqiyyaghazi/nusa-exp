import { SALT_ROUNDS } from '@/constant';
import UsersService from '@/services/mysql/UsersService';
import { BadRequestError, SuccessCreated } from '@/utils/httpResponse';
import { validateUserPayload } from '@/utils/validator/users';
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const usersService = new UsersService();

export async function POST(request) {
    const req = await request.json();

    const { status, msg } = validateUserPayload(req);

    if (!status) {
        return BadRequestError(msg);
    }
    const { password, email, name, role_id } = req;
    const isAvailable = await usersService.checkEmailAvailability(email);

    if (!isAvailable) {
        return BadRequestError('Gagal registrasi, email sudah digunakan!');
    }

    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    const passwordHash = await bcrypt.hash(password, salt);


    const result = await usersService.addUser({
        password: passwordHash,
        email,
        name,
        role_id,
    });

    if (!result.status) {
        return BadRequestError(result.msg);
    }

    return SuccessCreated(result.msg, result.data);
}
