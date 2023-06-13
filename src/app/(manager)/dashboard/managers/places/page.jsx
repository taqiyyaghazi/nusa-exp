'use client';
import { PlusIcon } from '@heroicons/react/24/outline';
import { Button } from '@material-tailwind/react';
import Link from 'next/link';
import React from 'react';

const Places = () => {
    return (
        <>
            <div className="grid justify-items-end">
                <Link href="dashboard/managers/places/add-places">
                    <Button className="flex items-center gap-3">
                        <PlusIcon strokeWidth={2} className="h-5 w-5" /> Add to
                        Bookmark
                    </Button>
                </Link>
            </div>
        </>
    );
};

export default Places;
