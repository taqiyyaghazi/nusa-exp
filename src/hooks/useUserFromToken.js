import { getCookieValue } from '@/utils/cookies';
import jwt_decode from 'jwt-decode';
import { useEffect, useState } from 'react';

const useUserFromToken = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = getCookieValue('token');
        if (token) {
            try {
                const decodedToken = jwt_decode(token);

                setUser(decodedToken);
            } catch (error) {
                console.error('Invalid token');
            }
        }
    }, []);

    return user;
};

export default useUserFromToken;
