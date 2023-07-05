'use client';
import { PlusIcon } from '@heroicons/react/24/outline';
import { Button } from '@material-tailwind/react';
import Link from 'next/link';
import React from 'react';

const Places = () => {
    return (
        <>
            <div className="grid justify-items-end">
                <Link href="dashboard/places/create">
                    <Button className="flex items-center gap-3">
                        <PlusIcon strokeWidth={2} className="h-5 w-5" /> Tambah
                        Wisata
                    </Button>
                </Link>
            </div>
        </>
    );
};

export default Places;
