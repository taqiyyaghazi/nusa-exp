import { ID_SIZE } from '@/constant';
import { nanoid } from 'nanoid';

const { defaultResult } = require('@/utils');
const { prisma } = require('@/utils/database/prismaClient');

class UsersService {
    constructor() {
        this._prisma = prisma;
    }

    async addUser({ name, email, password, role_id }) {
        const id = nanoid(ID_SIZE);
        const user = await this._prisma.users.create({
            data: {
                id: id,
                name: name,
                email: email,
                password: password,
                role_id: role_id,
            },
            select: {
                id: true,
                name: true,
                email: true,
                role_id: true,
            },
        });

        if (!user) {
            return defaultResult(false, 'Gagal menambahkan user!');
        }

        return defaultResult(true, 'Berhasil registrasi!', user);
    }

    async checkEmailAvailability(email) {
        const user = await this._prisma.users.findUnique({
            where: {
                email: email,
            },
        });

        if (user) {
            return false;
        }
        return true;
    }
}

export default UsersService;
