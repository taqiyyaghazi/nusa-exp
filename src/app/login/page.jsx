'use client';
import LoginForm from '@/components/forms/LoginForm';
import { useAppSelector } from '@/hooks/useRedux';
import React from 'react';

export default function Login() {
    const authUser = useAppSelector((state) => state.authUser);
    console.log(authUser);

    return (
        <main className="flex min-h-screen">
            <LoginForm />
        </main>
    );
}
