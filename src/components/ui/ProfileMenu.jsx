import { getFirstWord, getInitials } from '@/utils';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import {
    Button,
    Menu,
    MenuHandler,
    MenuItem,
    MenuList,
    Typography,
} from '@material-tailwind/react';
import React from 'react';

const ProfileMenu = ({ username, menuItems }) => {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const closeMenu = () => setIsMenuOpen(false);

    return (
        <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
            <MenuHandler>
                <Button
                    variant="text"
                    color="blue-gray"
                    className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
                >
                    <div className="avatar placeholder flex items-center gap-x-2">
                        <div className="bg-neutral-focus text-neutral-content rounded-full w-10">
                            <span>{getInitials(username)}</span>
                        </div>
                        <p className="text-gray-900 font-medium">
                            Hi, {getFirstWord(username)}
                        </p>
                        <ChevronDownIcon
                            strokeWidth={2.5}
                            className={`h-3 w-3 transition-transform ${
                                isMenuOpen ? 'rotate-180' : ''
                            }`}
                        />
                    </div>
                </Button>
            </MenuHandler>
            <MenuList className="p-1">
                {menuItems.map(({ label, icon, onClick }, key) => {
                    const isLastItem = key === menuItems.length - 1;
                    return (
                        <MenuItem
                            key={label}
                            onClick={onClick ? onClick : closeMenu}
                            className={`flex items-center gap-2 rounded ${
                                isLastItem
                                    ? 'hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10'
                                    : ''
                            }`}
                        >
                            {React.createElement(icon, {
                                className: `h-4 w-4 ${
                                    isLastItem ? 'text-red-500' : ''
                                }`,
                                strokeWidth: 2,
                            })}
                            <Typography
                                as="span"
                                variant="small"
                                className="font-normal"
                                color={isLastItem ? 'red' : 'inherit'}
                            >
                                {label}
                            </Typography>
                        </MenuItem>
                    );
                })}
            </MenuList>
        </Menu>
    );
};

export default ProfileMenu;
