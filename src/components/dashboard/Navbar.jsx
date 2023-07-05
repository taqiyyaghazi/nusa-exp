import useAlert from '@/hooks/useAlert';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { setAuthUser, unsetAuthUser } from '@/stores/authUser/authUserSlice';
import { deleteCookie, getCookieValue } from '@/utils/cookies';
import {
    Bars2Icon,
    ChevronDownIcon,
    CodeBracketSquareIcon,
    CubeTransparentIcon,
    HeartIcon,
    MapPinIcon,
    PowerIcon,
    PresentationChartBarIcon,
    RocketLaunchIcon,
    Square3Stack3DIcon,
    UserCircleIcon,
} from '@heroicons/react/24/outline';
import {
    Card,
    CardBody,
    Collapse,
    IconButton,
    Menu,
    MenuHandler,
    MenuItem,
    MenuList,
    MobileNav,
    Navbar,
    Typography,
} from '@material-tailwind/react';
import jwt_decode from 'jwt-decode';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import ProfileMenu from '../ui/ProfileMenu';
import { ROLE_VISITOR } from '@/constant';
import Link from 'next/link';

const managerMenu = [
    {
        icon: PresentationChartBarIcon,
        name: 'Dashboard',
        href: '/dashboard',
    },
    {
        icon: MapPinIcon,
        name: 'Wisata',
        href: '/dashboard/places',
    },
];

function NavList() {
    return (
        <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center">
            {managerMenu.map(({ name, icon, href }, key) => (
                <Link key={key} href={href}>
                    <Typography
                        key={name}
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                    >
                        <MenuItem className="flex items-center gap-2 lg:rounded-full">
                            {React.createElement(icon, {
                                className: 'h-[18px] w-[18px]',
                            })}{' '}
                            {name}
                        </MenuItem>
                    </Typography>
                </Link>
            ))}
        </ul>
    );
}

export default function ComplexNavbar() {
    const [isNavOpen, setIsNavOpen] = React.useState(false);
    const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);
    const authUser = useAppSelector((state) => state.authUser);
    const router = useRouter();
    const showAlert = useAlert();
    const dispatch = useAppDispatch();

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

    const handleLogout = () => {
        showAlert(
            'Berhasil Logout',
            'confirm',
            'Anda akan keluar dari aku ini',
            'Ya',
            () => {
                dispatch(unsetAuthUser());
                deleteCookie('token');
            }
        );
    };

    const profileMenuVisitor = [
        {
            label: 'My Wishlist',
            icon: HeartIcon,
            onClick: () => router.push('/wishlists'),
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
            onClick: () => router.push('/dashboard'),
        },
        {
            label: 'Sign Out',
            icon: PowerIcon,
            onClick: () => handleLogout(),
        },
    ];

    React.useEffect(() => {
        window.addEventListener(
            'resize',
            () => window.innerWidth >= 960 && setIsNavOpen(false)
        );
    }, []);

    return (
        <Navbar className="lg:mx-4 p-2 lg:rounded-md lg:pl-6 fixed top-2 z-10">
            <div className="relative mx-auto flex items-center text-blue-gray-900">
                <IconButton
                    size="sm"
                    color="blue-gray"
                    variant="text"
                    onClick={toggleIsNavOpen}
                    className="ml-auto mr-2 md:hidden"
                >
                    <Bars2Icon className="h-6 w-6" />
                </IconButton>
                {authUser && (
                    <ProfileMenu
                        username={authUser.name}
                        menuItems={
                            authUser.role_id === ROLE_VISITOR
                                ? profileMenuVisitor
                                : profileMenuManager
                        }
                    />
                )}
            </div>
            <Collapse open={isNavOpen}>
                <NavList />
            </Collapse>
        </Navbar>
    );
}
