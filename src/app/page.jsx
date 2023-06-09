'use client';
import { useAppSelector } from '@/hooks/useRedux';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function Home() {
    const [baseUrl, setBaseUrl] = useState('');
    const [data, setData] = useState('');
    const authUser = useAppSelector((state) => state.authUser);

    useEffect(() => {
        const fetchBaseUrl = async () => {
            const baseUrl = window.location.origin;
            setBaseUrl(baseUrl);
        };

        fetchBaseUrl();

        axios
            .post(baseUrl + '/api/auth', {
                firstName: 'Fred',
                lastName: 'Flintstone',
            })
            .then(function (response) {
                alert(response.data.token);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24"></main>
    );
}
