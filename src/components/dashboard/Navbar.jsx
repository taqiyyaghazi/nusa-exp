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
    PowerIcon,
    PresentationChartBarIcon,
    RocketLaunchIcon,
    Square3Stack3DIcon,
    UserCircleIcon
} from '@heroicons/react/24/outline';
import {
    Card,
    IconButton,
    Menu,
    MenuHandler,
    MenuItem,
    MenuList,
    MobileNav,
    Navbar,
    Typography
} from '@material-tailwind/react';
import jwt_decode from 'jwt-decode';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import ProfileMenu from '../ui/ProfileMenu';
import { ROLE_VISITOR } from '@/constant';

// nav list menu
const navListMenuItems = [
    {
        title: '@material-tailwind/html',
        description:
            'Learn how to use @material-tailwind/html, packed with rich components and widgets.',
    },
    {
        title: '@material-tailwind/react',
        description:
            'Learn how to use @material-tailwind/react, packed with rich components for React.',
    },
    {
        title: 'Material Tailwind PRO',
        description:
            'A complete set of UI Elements for building faster websites in less time.',
    },
];

function NavListMenu() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const triggers = {
        onMouseEnter: () => setIsMenuOpen(true),
        onMouseLeave: () => setIsMenuOpen(false),
    };

    const renderItems = navListMenuItems.map(({ title, description }) => (
        <a href="#" key={title}>
            <MenuItem>
                <Typography variant="h6" color="blue-gray" className="mb-1">
                    {title}
                </Typography>
                <Typography
                    variant="small"
                    color="gray"
                    className="font-normal"
                >
                    {description}
                </Typography>
            </MenuItem>
        </a>
    ));

    return (
        <React.Fragment>
            <Menu open={isMenuOpen} handler={setIsMenuOpen}>
                <MenuHandler>
                    <Typography
                        as="a"
                        href="#"
                        variant="small"
                        className="font-normal"
                    >
                        <MenuItem
                            {...triggers}
                            className="hidden items-center gap-2 text-blue-gray-900 lg:flex lg:rounded-full"
                        >
                            <Square3Stack3DIcon className="h-[18px] w-[18px]" />{' '}
                            Pages{' '}
                            <ChevronDownIcon
                                strokeWidth={2}
                                className={`h-3 w-3 transition-transform ${
                                    isMenuOpen ? 'rotate-180' : ''
                                }`}
                            />
                        </MenuItem>
                    </Typography>
                </MenuHandler>
                <MenuList
                    {...triggers}
                    className="hidden w-[36rem] grid-cols-7 gap-3 overflow-visible lg:grid"
                >
                    <Card
                        color="blue"
                        shadow={false}
                        variant="gradient"
                        className="col-span-3 grid h-full w-full place-items-center rounded-md"
                    >
                        <RocketLaunchIcon
                            strokeWidth={1}
                            className="h-28 w-28"
                        />
                    </Card>
                    <ul className="col-span-4 flex w-full flex-col gap-1">
                        {renderItems}
                    </ul>
                </MenuList>
            </Menu>
            <MenuItem className="flex items-center gap-2 text-blue-gray-900 lg:hidden">
                <Square3Stack3DIcon className="h-[18px] w-[18px]" /> Pages{' '}
            </MenuItem>
            <ul className="ml-6 flex w-full flex-col gap-1 lg:hidden">
                {renderItems}
            </ul>
        </React.Fragment>
    );
}

// nav list component
const navListItems = [
    {
        label: 'Account',
        icon: UserCircleIcon,
    },
    {
        label: 'Blocks',
        icon: CubeTransparentIcon,
    },
    {
        label: 'Docs',
        icon: CodeBracketSquareIcon,
    },
];

function NavList() {
    return (
        <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center">
            <NavListMenu />
            {navListItems.map(({ label, icon }, key) => (
                <Typography
                    key={label}
                    as="a"
                    href="#"
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                >
                    <MenuItem className="flex items-center gap-2 lg:rounded-full">
                        {React.createElement(icon, {
                            className: 'h-[18px] w-[18px]',
                        })}{' '}
                        {label}
                    </MenuItem>
                </Typography>
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
            onClick: () => router.push('/dashboard/managers'),
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
            <MobileNav open={isNavOpen} className="overflow-scroll">
                <NavList />
            </MobileNav>
        </Navbar>
    );
}
