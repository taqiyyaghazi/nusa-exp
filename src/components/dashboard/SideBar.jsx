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
} from '@heroicons/react/24/solid';
import Link from 'next/link';

export default function SideBar() {
    return (
        <Card className="hidden md:block fixed mt-16 bg-gray-800 top-4 left-4 h-[calc(100vh-6rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
            <div className="mb-2 p-4">
                <Typography variant="h5" color="white">
                    Sidebar
                </Typography>
            </div>
            <List>
                <ListItem className="text-white">
                    <ListItemPrefix>
                        <PresentationChartBarIcon className="h-5 w-5" />
                    </ListItemPrefix>
                    Dashboard
                </ListItem>
                <a href="/dashboard/managers/places">
                    <ListItem className="text-white">
                        <ListItemPrefix>
                            <MapPinIcon className="h-5 w-5" />
                        </ListItemPrefix>
                        Wisata
                    </ListItem>
                </a>
                <ListItem className="text-white">
                    <ListItemPrefix>
                        <InboxIcon className="h-5 w-5" />
                    </ListItemPrefix>
                    Inbox
                    <ListItemSuffix>
                        <Chip
                            value="14"
                            size="sm"
                            variant="ghost"
                            color="red"
                            className="rounded-full text-gray-900 bg-white"
                        />
                    </ListItemSuffix>
                </ListItem>
                <ListItem className="text-white">
                    <ListItemPrefix>
                        <UserCircleIcon className="h-5 w-5" />
                    </ListItemPrefix>
                    Profile
                </ListItem>
                <ListItem className="text-white">
                    <ListItemPrefix>
                        <Cog6ToothIcon className="h-5 w-5" />
                    </ListItemPrefix>
                    Settings
                </ListItem>
                <ListItem className="text-white">
                    <ListItemPrefix>
                        <PowerIcon className="h-5 w-5" />
                    </ListItemPrefix>
                    Log Out
                </ListItem>
            </List>
        </Card>
    );
}
