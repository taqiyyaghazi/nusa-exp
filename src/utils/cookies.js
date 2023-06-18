export const getCookieValue = (cookieName) => {
    const cookies = document.cookie;
    const cookieArray = cookies.split('; ');
    for (let i = 0; i < cookieArray.length; i++) {
        const cookie = cookieArray[i].split('=');
        if (cookie[0] === cookieName) {
            return cookie[1];
        }
    }
    return '';
};

export const deleteCookie = (name) => {
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}
