import { JWT_SECRET_KEY } from '@/constant';
import FilesService from '@/services/mysql/FilesService';
import PlacesService from '@/services/mysql/PlacesService';
import RolesService from '@/services/mysql/RolesService';
import { extractToken } from '@/utils';
import { checkUserAuthenticated } from '@/utils/api';
import { prisma } from '@/utils/database/prismaClient';
import {
    BadRequestError,
    ErrorNotFound,
    SuccessCreated,
    SuccessOK,
    UnauthorizedError,
} from '@/utils/httpResponse';
import { jwtVerify } from '@/utils/jwt';
import { validatePlacePayload } from '@/utils/validator/places';
import { useParams } from 'next/navigation';

const rolesService = new RolesService();
const filesService = new FilesService();
const placesService = new PlacesService();

export async function POST(request) {
    const req = await request.json();
    const headers = request.headers;
    const auth = headers.get('Authorization');
    const isAuthenticated = await checkUserAuthenticated(auth);
    if (!isAuthenticated.status) {
        return UnauthorizedError(isAuthenticated.msg);
    }

    const { id: userId } = isAuthenticated.data;

    const { status, msg } = validatePlacePayload(req);

    if (!status) {
        return BadRequestError(msg);
    }

    const result = await placesService.addPlaces({ ...req, userId });

    if (!result.status) {
        return BadRequestError(result.msg);
    }

    return SuccessCreated('Berhasil menambahkan wisata baru!', result.data);
}

export async function GET(request) {
    const headers = request.headers;
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const auth = headers.get('Authorization');
    const isAuthenticated = await checkUserAuthenticated(auth);
    if (!isAuthenticated.status) {
        return UnauthorizedError(isAuthenticated.msg);
    }

    // TO DO: Tambahkan pengecekan apakah role = admin
    let result;
    if (id) {
        result = await placesService.getPlaceById(id);
    } else {
        result = await placesService.getAllPlacesUnpublished();
    }

    if (!result.status) {
        return ErrorNotFound(result.msg);
    }

    return SuccessOK(result.msg, result.data);
}
