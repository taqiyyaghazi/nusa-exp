'use client';

import { useAppSelector } from '@/hooks/useRedux';
import React from 'react';

const Register = () => {
    const authUser = useAppSelector((state) => state.authUser);
    return <div>Register { authUser }</div>;
};

export default Register;
