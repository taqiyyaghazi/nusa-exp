/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import LoginForm from '@/components/forms/LoginForm';
import useAlert from '@/hooks/useAlert';
import { useAppDispatch } from '@/hooks/useRedux';
import { useLoginMutation } from '@/services/api/authApi';
import { setAuthUser } from '@/stores/authUser/authUserSlice';
import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

const schema = yup
    .object({
        email: yup.string().email().required(),
        password: yup.string().required(),
    })
    .required();

export default function Login() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });
    const dispatch = useAppDispatch()
    const showAlert = useAlert();
    const router = useRouter();

    const [login, { data, isLoading, isError, error }] = useLoginMutation();

    const onSubmit = (data) => {
        login(data);
    };

    useEffect(() => {
        if (isError) {
            showAlert(error.data.msg, 'error');
        }
        if (data) {
            showAlert(data.msg, 'success');
            dispatch(setAuthUser(data.data))
            const timeout = setTimeout(() => {
                router.push('/');
            }, 3000);
            return () => {
                clearTimeout(timeout);
            };
        }
    }, [isError, data]);

    return (
        <main className="flex min-h-screen">
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Sign in to your account
                    </h2>
                </div>
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <LoginForm
                        register={register}
                        handleSubmit={handleSubmit}
                        errors={errors}
                        onSubmit={onSubmit}
                        isLoading={isLoading}
                    />
                    <p className="mt-10 text-center text-sm text-gray-500">
                        Don&apos;t have an account?{' '}
                        <Link
                            href="/register"
                            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                        >
                            Register
                        </Link>
                    </p>
                </div>
            </div>
        </main>
    );
}
