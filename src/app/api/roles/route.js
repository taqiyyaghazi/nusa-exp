import RolesService from '@/services/mysql/RolesService';
import {
    BadRequestError,
    SuccessCreated,
    SuccessOK,
} from '@/utils/httpResponse';
import { validateRolePayload } from '@/utils/validator/roles';

const rolesService = new RolesService();

export async function POST(request) {
    const req = await request.json();

    const { status, msg } = validateRolePayload(req);

    if (!status) {
        return BadRequestError(msg);
    }

    const result = await rolesService.addRoles(req);

    if (!result.status) {
        return BadRequestError(result.msg);
    }

    return SuccessCreated(result.msg, result.data);
}

export async function GET() {
    const result = await rolesService.getAllRoles();

    return SuccessOK(result.msg, result.data);
}
