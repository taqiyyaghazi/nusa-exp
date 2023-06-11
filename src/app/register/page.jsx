'use client';
import RegisterForm from '@/components/forms/RegisterForm';
import { useRegisterMutation } from '@/services/api/authApi';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

const schema = yup
    .object({
        name: yup.string().required(),
        email: yup.string().email().required(),
        password: yup.string().required(),
        role_id: yup.number().required(),
    })
    .required();

const Register = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const [registerUser, { data, isLoading, isError, error }] =
        useRegisterMutation();

    const onSubmit = (data) => {
        registerUser(data);
        // TO DO: tampilkan popup berhasil atau gagal
        // TO DO: redirect ke login page
    };
    return (
        <main className="flex min-h-screen">
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Register new account
                    </h2>
                </div>
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <RegisterForm
                        register={register}
                        handleSubmit={handleSubmit}
                        errors={errors}
                        onSubmit={onSubmit}
                    />
                </div>
            </div>
        </main>
    );
};

export default Register;
