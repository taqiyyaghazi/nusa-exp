export const defaultResult = (status = false, msg = null, data = null) => {
    return {
        status: status,
        msg: msg,
        data: data,
    };
};

export const getInitials = (name) => {
    const words = name.trim().split(' ');
    const initials = words.map((word) => word.charAt(0).toUpperCase());
    return initials.join('');
};

export const getFirstWord = (str) => {
    const words = str.trim().split(' ');
    if (words.length === 0) {
        return '';
    }
    return words[0];
};
