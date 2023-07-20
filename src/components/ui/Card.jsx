import Image from 'next/image';
import React from 'react';

const Card = ({ data }) => {
    return (
        <article
            key={data.id}
            className="snap-center flex-shrink-0 w-full md:w-96 flex flex-col items-start justify-between mx-2"
        >
            <figure className="my-3 h-56 w-full relative">
                <Image
                    src={data.file_url}
                    alt={data.filename}
                    fill={true}
                    className="rounded-xl object-cover"
                />
            </figure>
            <div className="flex items-center gap-x-4 text-xs">
                <a
                    // href={data.category.href}
                    className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                >
                    {data.regency}, {data.province}
                </a>
            </div>
            <div className="group relative">
                <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600 group-hover:cursor-pointer">
                    <a href={data.href}>
                        <span className="absolute inset-0" />
                        {data.name}
                    </a>
                </h3>
            </div>
        </article>
    );
};

export default Card;
