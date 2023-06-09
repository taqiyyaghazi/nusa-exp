"use client"
import { useAppSelector } from '@/hooks/useRedux';
import React from 'react';

export default function Login() {
    const authUser = useAppSelector((state) => state.authUser);
    console.log(authUser)

    
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            
        </main>
    );
}
