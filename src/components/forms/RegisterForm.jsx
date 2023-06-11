export default function RegisterForm({
    register,
    handleSubmit,
    errors,
    onSubmit,
    isLoading,
}) {
    return (
        <>
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label
                        htmlFor="name"
                        className="block text-sm font-medium leading-6 text-gray-900"
                    >
                        Name
                    </label>
                    <div className="mt-2">
                        <input
                            id="name"
                            name="email"
                            type="text"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            {...register('name')}
                        />
                        {errors.name && (
                            <span className="normal-case text-xs text-red-400">
                                {errors.name.message}
                            </span>
                        )}
                    </div>
                </div>
                <div>
                    <label
                        htmlFor="email"
                        className="block text-sm font-medium leading-6 text-gray-900"
                    >
                        Email address
                    </label>
                    <div className="mt-2">
                        <input
                            id="email"
                            name="email"
                            type="text"
                            autoComplete="email"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            {...register('email')}
                        />
                        {errors.email && (
                            <span className="normal-case text-xs text-red-400">
                                {errors.email.message}
                            </span>
                        )}
                    </div>
                </div>

                <div>
                    <div className="flex items-center justify-between">
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Password
                        </label>
                        <div className="text-sm">
                            <a
                                href="#"
                                className="font-semibold text-indigo-600 hover:text-indigo-500"
                            >
                                Forgot password?
                            </a>
                        </div>
                    </div>
                    <div className="mt-2">
                        <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            {...register('password')}
                        />
                        {errors.password && (
                            <span className="normal-case text-xs text-red-400">
                                {errors.password.message}
                            </span>
                        )}
                    </div>
                </div>

                <div>
                    <label
                        htmlFor="role_id"
                        className="block text-sm font-medium leading-6 text-gray-900"
                    ></label>
                    <div className="mt-2 flex gap-x-8">
                        <div className="flex items-center gap-x-2">
                            <input
                                type="radio"
                                name="role_id"
                                value={1}
                                className="radio radio-primary"
                                checked
                                {...register('role_id')}
                            />
                            <span className=" text-gray-900">Wisatawan</span>
                        </div>
                        <div className="flex items-center gap-x-2">
                            <input
                                type="radio"
                                name="role_id"
                                value={2}
                                className="radio radio-primary"
                                {...register('role_id')}
                            />
                            <span className=" text-gray-900">
                                Pengelola Wisata
                            </span>
                        </div>

                        {errors.role_id && (
                            <span className="normal-case text-xs text-red-400">
                                {errors.role_id.message}
                            </span>
                        )}
                    </div>
                </div>

                <div>
                    {isLoading ? (
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled
                        >
                            <span className="loading loading-spinner loading-sm"></span>{' '}
                            <p className="ml-2">Loading...</p>
                        </button>
                    ) : (
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Register
                        </button>
                    )}
                </div>
            </form>
        </>
    );
}
