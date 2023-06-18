'use client';
import { ROLE_VISITOR } from '@/constant';
import useAlert from '@/hooks/useAlert';
import { deleteCookie, getCookieValue } from '@/utils/cookies';
import { Dialog } from '@headlessui/react';
import {
    Bars3Icon,
    HeartIcon,
    PowerIcon,
    PresentationChartBarIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline';
import jwt_decode from 'jwt-decode';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import ProfileMenu from '../ui/ProfileMenu';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { setAuthUser, unsetAuthUser } from '@/stores/authUser/authUserSlice';

const navigation = [
    { name: 'Wisata', href: '#' },
    { name: 'Features', href: '#' },
    { name: 'Marketplace', href: '#' },
    { name: 'Company', href: '#' },
];

const Navbar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const authUser = useAppSelector((state) => state.authUser);
    const dispatch = useAppDispatch();
    const showAlert = useAlert();

    const handleLogout = () => {
        showAlert(
            'Berhasil Logout',
            'confirm',
            'Anda akan keluar dari aku ini',
            'Ya',
            () => {
                dispatch(unsetAuthUser())
                deleteCookie('token');
            }
        );
    };

    const profileMenuVisitor = [
        {
            label: 'My Wishlist',
            icon: HeartIcon,
        },
        {
            label: 'Sign Out',
            icon: PowerIcon,
            onClick: () => handleLogout(),
        },
    ];

    const profileMenuManager = [
        {
            label: 'Dashboard',
            icon: PresentationChartBarIcon,
        },
        {
            label: 'Sign Out',
            icon: PowerIcon,
        },
    ];

    useEffect(() => {
        const token = getCookieValue('token');
        if (token) {
            try {
                const decodedToken = jwt_decode(token);

                dispatch(setAuthUser(decodedToken));
            } catch (error) {
                console.error('Invalid token');
            }
        }
    }, []);

    return (
        <header className="fixed backdrop-blur-md inset-x-0 top-0 z-50">
            <nav
                className="flex items-center justify-between p-6 lg:px-8"
                aria-label="Global"
            >
                <div className="flex lg:flex-1">
                    <a href="#" className="-m-1.5 p-1.5">
                        <span className="sr-only">Nusantara Explorer</span>
                        <p className="font-bold text-gray-900">NusaExp</p>
                    </a>
                </div>
                <div className="flex lg:hidden">
                    <button
                        type="button"
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                        onClick={() => setMobileMenuOpen(true)}
                    >
                        <span className="sr-only">Open main menu</span>
                        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                    </button>
                </div>
                <div className="hidden lg:flex lg:gap-x-12">
                    {navigation.map((item) => (
                        <a
                            key={item.name}
                            href={item.href}
                            className="text-sm font-semibold leading-6 text-gray-900 hover:text-gray-500 ease-in-out duration-300"
                        >
                            {item.name}
                        </a>
                    ))}
                </div>
                <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                    {authUser ? (
                        <ProfileMenu
                            username={authUser.name}
                            menuItems={
                                authUser.role_id === ROLE_VISITOR
                                    ? profileMenuVisitor
                                    : profileMenuManager
                            }
                        />
                    ) : (
                        <Link
                            href="/login"
                            className="text-sm font-semibold leading-6 text-gray-900 hover:text-gray-500 ease-in-out duration-300"
                        >
                            Log In <span aria-hidden="true">&rarr;</span>
                        </Link>
                    )}
                </div>
            </nav>
            <Dialog
                as="div"
                className="lg:hidden "
                open={mobileMenuOpen}
                onClose={setMobileMenuOpen}
            >
                <div className="fixed inset-0 z-50" />
                <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                    <div className="flex items-center justify-between">
                        <a href="#" className="-m-1.5 p-1.5">
                            <span className="sr-only">Nusantara Explorer</span>
                            <p className="font-bold text-gray-900">NusaExp</p>
                        </a>
                        <button
                            type="button"
                            className="-m-2.5 rounded-md p-2.5 text-gray-700"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <span className="sr-only">Close menu</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>
                    <div className="mt-6 flow-root">
                        <div className="-my-6 divide-y divide-gray-500/10">
                            <div className="space-y-2 py-6">
                                {navigation.map((item) => (
                                    <a
                                        key={item.name}
                                        href={item.href}
                                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                    >
                                        {item.name}
                                    </a>
                                ))}
                            </div>
                            <div className="py-6">
                                {authUser ? (
                                    <ProfileMenu
                                        username={authUser.name}
                                        menuItems={
                                            authUser.role_id === ROLE_VISITOR
                                                ? profileMenuVisitor
                                                : profileMenuManager
                                        }
                                    />
                                ) : (
                                    <Link
                                        href="/login"
                                        className="text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-50"
                                    >
                                        Log In{' '}
                                        <span aria-hidden="true">&rarr;</span>
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </Dialog.Panel>
            </Dialog>
        </header>
    );
};

export default Navbar;
