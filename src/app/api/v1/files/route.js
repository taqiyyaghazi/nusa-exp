import CategoriesService from '@/services/mysql/CategoriesService';
import {
    BadRequestError,
    SuccessCreated,
    SuccessOK,
} from '@/utils/httpResponse';
import { validateCategoryPayload } from '@/utils/validator/categories';

const categoriesService = new CategoriesService();

export async function POST(request) {
    const req = await request.json();

    const { status, msg } = validateCategoryPayload(req);

    if (!status) {
        return BadRequestError(msg);
    }

    const result = await categoriesService.addCategory(req);

    if (!result.status) {
        return BadRequestError(result.msg);
    }

    return SuccessCreated(result.msg, result.data);
}

export async function GET() {
    const result = await categoriesService.getAllRoles();

    return SuccessOK(result.msg, result.data);
}
