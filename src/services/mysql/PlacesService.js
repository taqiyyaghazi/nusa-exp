import { ID_SIZE } from '@/constant';
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
            console.log(err)
            return defaultResult(false, 'Gagal menambahkan wisata!', err);
        }
    }

    blobToText = (blob) => {
        const reader = new FileReader();
        return new Promise((resolve, reject) => {
            reader.onload = () => {
                resolve(reader.result);
            };
            reader.onerror = () => {
                reject(reader.error);
            };
            reader.readAsText(blob);
        });
    };

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
}

export default PlacesService;
