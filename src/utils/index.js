export const defaultResult = (status = false, msg = null, data = null) => {
    return {
        status: status,
        msg: msg,
        data: data,
    };
};
