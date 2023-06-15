import { JWT_SECRET_KEY } from '@/constant';
import FilesService from '@/services/mysql/FilesService';
import PlacesService from '@/services/mysql/PlacesService';
import RolesService from '@/services/mysql/RolesService';
import { extractToken } from '@/utils';
import { prisma } from '@/utils/database/prismaClient';
import {
    BadRequestError,
    SuccessCreated,
    SuccessOK,
    UnauthorizedError,
} from '@/utils/httpResponse';
import { jwtVerify } from '@/utils/jwt';
import { validatePlacePayload } from '@/utils/validator/places';

const rolesService = new RolesService();
const filesService = new FilesService();
const placesService = new PlacesService();

export async function POST(request) {
    const req = await request.json();
    const headers = request.headers;
    const auth = headers.get('Authorization');
    if (!auth) {
        return UnauthorizedError('Authorization Error!');
    }
    const token = extractToken(auth);

    if (!token) {
        return UnauthorizedError('Authorization Error!');
    }
    const isValid = await jwtVerify(token, JWT_SECRET_KEY);

    if (!isValid.status) {
        return UnauthorizedError(isValid.msg);
    }

    const { id: userId } = isValid.data;

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

export async function GET() {
    const result = await placesService.getAllPlaces()

    return SuccessOK(result.msg, result.data);
}
