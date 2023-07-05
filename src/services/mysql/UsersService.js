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

    async getUserByEmail(email) {
        const user = await this._prisma.users.findUnique({
            where: {
                email: email,
            },
            select: {
                id: true,
                name: true,
                email: true,
                password: true,
                role_id: true,
            },
        });

        if (!user) {
            return defaultResult(
                false,
                'Akun tidak tersedia, silahkan register terlebih dahulu'
            );
        }
        return defaultResult(true, 'Berhasil mendapatkan user', user);
    }
}

export default UsersService;
