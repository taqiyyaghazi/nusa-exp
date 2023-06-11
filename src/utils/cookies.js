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
