import { ID_SIZE } from '@/constant';
import { nanoid } from 'nanoid';

const { defaultResult } = require('@/utils');
const { prisma } = require('@/utils/database/prismaClient');

class FilesService {
    constructor() {
        this._prisma = prisma;
    }

    async addFile({ filename, filecode }, transaction = null) {
        let file;
        const id = nanoid(ID_SIZE);

        if (transaction) {
            file = await transaction.files.create({
                data: { id: id, filename: filename, filecode: filecode },
            });
        } else {
            file = await this._prisma.categories.create({
                data: { id: id, filename: filename, filecode: filecode },
                select: {
                    id: true,
                },
            });
        }

        if (!file) {
            return defaultResult(false, 'Gagal menambahkan file');
        }

        return defaultResult(true, 'Berhasil menambahkan file!', file);
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

export default FilesService;
