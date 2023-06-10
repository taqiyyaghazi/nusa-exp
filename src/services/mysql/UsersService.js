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
        const role = await this._prisma.users.create({
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

        if (!role) {
            return defaultResult(false, 'Gagal menambahkan user!');
        }

        return defaultResult(true, 'Berhasil menambahkan user!', role);
    }

    // async getAllRoles() {
    //     const roles = await this._prisma.roles.findMany({
    //         where: {
    //             is_deleted: false,
    //         },
    //         select: {
    //             id: true,
    //             name: true,
    //             description: true,
    //         },
    //     });

    //     return defaultResult(true, 'Berhasil mendapatkan roles!', roles);
    // }
}

export default UsersService;
