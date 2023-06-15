import { ID_SIZE } from '@/constant';
import { nanoid } from 'nanoid';

const { defaultResult } = require('@/utils');
const { prisma } = require('@/utils/database/prismaClient');

class CategoriesService {
    constructor() {
        this._prisma = prisma;
    }

    async addCategory({ name }) {
        const id = nanoid(ID_SIZE);
        
        const category = await this._prisma.categories.create({
            data: { id: id, name: name },
            select: {
                id: true,
            },
        });

        if (!category) {
            return defaultResult(false, 'Gagal menambahkan category');
        }

        return defaultResult(true, 'Berhasil menambahkan category!', category);
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

export default CategoriesService;
