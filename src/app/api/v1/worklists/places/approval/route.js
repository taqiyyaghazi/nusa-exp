import FilesService from '@/services/mysql/FilesService';
import PlacesService from '@/services/mysql/PlacesService';
import RolesService from '@/services/mysql/RolesService';
import { checkUserAuthenticated } from '@/utils/api';
import {
    BadRequestError,
    SuccessCreated,
    SuccessOK,
    UnauthorizedError,
} from '@/utils/httpResponse';
import { validatePlacePayload } from '@/utils/validator/places';

const rolesService = new RolesService();
const filesService = new FilesService();
const placesService = new PlacesService();

export async function PATCH(request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const headers = request.headers;
    const auth = headers.get('Authorization');
    const isAuthenticated = await checkUserAuthenticated(auth);
    if (!isAuthenticated.status) {
        return UnauthorizedError(isAuthenticated.msg);
    }

    const { id: userId } = isAuthenticated.data;
    // TO DO: cek role adalah admin

    if (!id) {
        return BadRequestError('Parameter id adalah mandatory');
    }

    const result = await placesService.updateIsPublishPlace({id, isPublish: true})

    if (!result.status) {
        return BadRequestError(result.msg);
    }

    return SuccessOK(result.msg, result.data);
}
