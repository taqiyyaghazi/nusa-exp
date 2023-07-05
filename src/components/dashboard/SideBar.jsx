'use client';
import {
    Card,
    Typography,
    List,
    ListItem,
    ListItemPrefix,
    ListItemSuffix,
    Chip,
} from '@material-tailwind/react';
import {
    PresentationChartBarIcon,
    ShoppingBagIcon,
    UserCircleIcon,
    Cog6ToothIcon,
    InboxIcon,
    PowerIcon,
    MapPinIcon,
    UserGroupIcon,
} from '@heroicons/react/24/solid';
import Link from 'next/link';
import React from 'react';
import { useAppSelector } from '@/hooks/useRedux';
import { ROLE_ADMIN, ROLE_MANAGER } from '@/constant';

const adminMenu = [
    {
        icon: PresentationChartBarIcon,
        name: 'Dashboard',
        href: '/dashboard',
    },
    {
        icon: UserGroupIcon,
        name: 'Users',
        href: '/users',
    },
];
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

export default function SideBar() {
    const authUser = useAppSelector((state) => state.authUser);
    return (
        <Card className="hidden md:block fixed mt-16 bg-gray-800 top-4 left-4 h-[calc(100vh-6rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
            <div className="mb-2 p-4">
                <Typography variant="h5" color="white">
                    NusaExp
                </Typography>
            </div>
            <List>
                {authUser?.role_id === ROLE_MANAGER && managerMenu.map((item, index) => (
                    <Link href={item.href} key={index}>
                        <ListItem className="text-white">
                            <ListItemPrefix>
                                {React.createElement(item.icon, {
                                    className: 'h-5 w-5',
                                })}
                            </ListItemPrefix>
                            {item.name}
                        </ListItem>
                    </Link>
                ))}

                {authUser?.role_id === ROLE_ADMIN && adminMenu.map((item, index) => (
                    <Link href={item.href} key={index}>
                        <ListItem className="text-white">
                            <ListItemPrefix>
                                {React.createElement(item.icon, {
                                    className: 'h-5 w-5',
                                })}
                            </ListItemPrefix>
                            {item.name}
                        </ListItem>
                    </Link>
                ))}
            </List>
        </Card>
    );
}
