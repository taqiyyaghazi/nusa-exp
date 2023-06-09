const { defaultResult } = require('@/utils');
const { prisma } = require('@/utils/database/prismaClient');

class RolesService {
    constructor() {
        this._prisma = prisma;
    }

    async addRoles({ name, description }) {
        const role = await this._prisma.roles.create({
            data: { name: name, description: description },
            select: {
                id: true,
                name: true,
                description: true,
            },
        });

        if (!role) {
            return defaultResult(false, 'Gagal menambahkan role');
        }

        return defaultResult(true, 'Berhasil menambahkan role!', role);
    }

    async getAllRoles() {
        const roles = await this._prisma.roles.findMany({
            where: {
                is_deleted: false,
            },
            select: {
                id: true,
                name: true,
                description: true,
            },
        });

        return defaultResult(true, 'Berhasil mendapatkan roles!', roles);
    }
}

export default RolesService;
