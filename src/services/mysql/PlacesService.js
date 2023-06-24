import { ID_SIZE } from '@/constant';
import { Prisma } from '@prisma/client';
import { nanoid } from 'nanoid';

const { defaultResult } = require('@/utils');
const { prisma } = require('@/utils/database/prismaClient');

class PlacesService {
    constructor() {
        this._prisma = prisma;
    }

    async addPlaces({
        name,
        description,
        mapsUrl,
        address,
        village,
        subdistrict,
        regency,
        province,
        filename,
        photo,
        userId,
    }) {
        const fileId = nanoid(ID_SIZE);
        const placeId = nanoid(ID_SIZE);
        const placeManagerId = nanoid(ID_SIZE);
        const desc = Buffer.from(description, 'utf8');
        const createFile = this._prisma.files.create({
            data: {
                id: fileId,
                filename: filename,
                file_url: photo,
            },
            select: {
                id: true,
            },
        });
        const createPlace = this._prisma.places.create({
            data: {
                id: placeId,
                name: name,
                description: desc,
                maps_url: mapsUrl,
                address: address,
                village: village,
                subdistrict: subdistrict,
                regency: regency,
                province: province,
                cover: fileId,
            },
            select: {
                id: true,
            },
        });
        const createPlaceManager = this._prisma.placeManagers.create({
            data: {
                id: placeManagerId,
                user_id: userId,
                place_id: placeId,
            },
        });

        try {
            const [file, place, placeManagers] =
                await this._prisma.$transaction([
                    createFile,
                    createPlace,
                    createPlaceManager,
                ]);
            return defaultResult(true, 'Berhasil menambahkan wisata!', {
                place,
                file,
                placeManagers,
            });
        } catch (err) {
            console.log(err);
            return defaultResult(false, 'Gagal menambahkan wisata!', err);
        }
    }

    async getAllPlaces() {
        const places = await this._prisma.$queryRaw`
            SELECT p.name, p.cover, CONVERT(p.description USING utf8) AS description, 
            p.maps_url, p.address, p.village, p.subdistrict, p.regency, 
            p.province, f.filename, f.file_url 
            FROM PlaceManagers pm 
            LEFT JOIN Places p ON p.id = pm.place_id
            LEFT JOIN Files f ON f.id = p.cover
            WHERE p.is_deleted = 0
            `;
        return defaultResult(true, 'Berhasil mendapatkan wisata!', places);
    }

    async getPlaceById(id) {
        const places = await this._prisma.$queryRaw`
            SELECT p.name, p.cover, CONVERT(p.description USING utf8) AS description, 
            p.maps_url, p.address, p.village, p.subdistrict, p.regency, 
            p.province, f.filename, f.file_url 
            FROM PlaceManagers pm 
            LEFT JOIN Places p ON p.id = pm.place_id
            LEFT JOIN Files f ON f.id = p.cover
            WHERE p.is_deleted = 0 AND p.id = ${id}
            `;

        if (places.length === 0) {
            return defaultResult(
                false,
                `Data wisata dengan id ${id} tidak ditemukan!`
            );
        }
        return defaultResult(
            true,
            'Berhasil mendapatkan detail wisata!',
            places[0]
        );
    }

    async getAllPlacesUnpublished() {
        const places = await this._prisma.$queryRaw`
            SELECT p.id, p.name, p.address, p.village, 
            p.subdistrict, p.regency, p.province, 
            CASE
                WHEN p.updated_at IS NULL THEN DATE_FORMAT(p.created_at, '%d/%m/%Y %H:%i')
                ELSE DATE_FORMAT(p.updated_at, '%d/%m/%Y %H:%i')
            END AS last_updated         
            FROM Places p
            WHERE p.is_deleted = 0 AND p.is_publish = 0
            `;
        return defaultResult(true, 'Berhasil mendapatkan wisata!', places);
    }

    async updateIsPublishPlace({ id, isPublish }) {
        // TO DO: Buat fungsi untuk handling error transaksi database
        try {
            const place = await this._prisma.places.update({
                where: { id: id },
                data: { is_publish: isPublish },
            });
            return defaultResult(true, 'Berhasil mempublikasikan wisata!', {
                id: place.id,
                is_publish: place.is_publish,
            });
        } catch (err) {
            if (err instanceof Prisma.PrismaClientKnownRequestError) {
                return defaultResult(
                    false,
                    `Gagal mempublikasikan wisata! error: ${err.meta.cause}`
                );
            }
            return defaultResult(false, 'Gagal mempublikasikan wisata!');
        }
    }
}

export default PlacesService;
