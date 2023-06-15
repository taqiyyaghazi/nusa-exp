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

export const getFileBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onloadend = () => {
            resolve(reader.result);
        };

        reader.onerror = (error) => {
            reject(error);
        };

        reader.readAsDataURL(file);
    });
};

export const extractURLFromString = (string) => {
    const regex = /src="([^"]+)"/;
    const match = string.match(regex);

    if (match && match[1]) {
        return match[1];
    } else {
        return null;
    }
};

export const extractToken = (bearerToken) => {
    const tokenParts = bearerToken.split(' ');

    if (tokenParts.length === 2 && tokenParts[0] === 'Bearer') {
        return tokenParts[1];
    }

    return null;
}
