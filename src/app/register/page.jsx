'use client';

import RegisterForm from '@/components/forms/RegisterForm';
import { useAppSelector } from '@/hooks/useRedux';
import React from 'react';

const Register = () => {
    const authUser = useAppSelector((state) => state.authUser);
    return (
        <main className="flex min-h-screen">
            <RegisterForm />
        </main>
    );
};

export default Register;
