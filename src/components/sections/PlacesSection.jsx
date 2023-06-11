import Image from 'next/image';
import { useEffect } from 'react';

const posts = [
    {
        id: 1,
        name: 'Wisata Gunung Bromo',
        href: '#',
        description:
            'Gunung Bromo adalah tujuan wisata alam yang terkenal di Indonesia, terletak di Jawa Timur. Dengan pemandangan matahari terbit yang spektakuler, lanskap gunung berapi yang dramatis, dan Lautan Pasir yang luas, Gunung Bromo menawarkan pengalaman alam yang tak terlupakan bagi pengunjungnya.',
        date: 'Mar 16, 2020',
        datetime: '2020-03-16',
        category: { title: 'Mount', href: '#' },
        author: {
            name: 'Kabupaten Probolinggo',
            role: 'Jawa Timur',
            href: '#',
            imageUrl:
                'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
    },
    {
        id: 3,
        name: 'Wisata Gunung Bromo',
        href: '#',
        description:
            'Gunung Bromo adalah tujuan wisata alam yang terkenal di Indonesia, terletak di Jawa Timur. Dengan pemandangan matahari terbit yang spektakuler, lanskap gunung berapi yang dramatis, dan Lautan Pasir yang luas, Gunung Bromo menawarkan pengalaman alam yang tak terlupakan bagi pengunjungnya.',
        date: 'Mar 16, 2020',
        datetime: '2020-03-16',
        category: { title: 'Mount', href: '#' },
        author: {
            name: 'Kabupaten Probolinggo',
            role: 'Jawa Timur',
            href: '#',
            imageUrl:
                'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
    },
    {
        id: 4,
        name: 'Wisata Gunung Bromo',
        href: '#',
        description:
            'Gunung Bromo adalah tujuan wisata alam yang terkenal di Indonesia, terletak di Jawa Timur. Dengan pemandangan matahari terbit yang spektakuler, lanskap gunung berapi yang dramatis, dan Lautan Pasir yang luas, Gunung Bromo menawarkan pengalaman alam yang tak terlupakan bagi pengunjungnya.',
        date: 'Mar 16, 2020',
        datetime: '2020-03-16',
        category: { title: 'Mount', href: '#' },
        author: {
            name: 'Kabupaten Probolinggo',
            role: 'Jawa Timur',
            href: '#',
            imageUrl:
                'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
    },
    {
        id: 5,
        name: 'Wisata Gunung Bromo',
        href: '#',
        description:
            'Gunung Bromo adalah tujuan wisata alam yang terkenal di Indonesia, terletak di Jawa Timur. Dengan pemandangan matahari terbit yang spektakuler, lanskap gunung berapi yang dramatis, dan Lautan Pasir yang luas, Gunung Bromo menawarkan pengalaman alam yang tak terlupakan bagi pengunjungnya.',
        date: 'Mar 16, 2020',
        datetime: '2020-03-16',
        category: { title: 'Mount', href: '#' },
        author: {
            name: 'Kabupaten Probolinggo',
            role: 'Jawa Timur',
            href: '#',
            imageUrl:
                'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
    },
    {
        id: 6,
        name: 'Wisata Gunung Bromo',
        href: '#',
        description:
            'Gunung Bromo adalah tujuan wisata alam yang terkenal di Indonesia, terletak di Jawa Timur. Dengan pemandangan matahari terbit yang spektakuler, lanskap gunung berapi yang dramatis, dan Lautan Pasir yang luas, Gunung Bromo menawarkan pengalaman alam yang tak terlupakan bagi pengunjungnya.',
        date: 'Mar 16, 2020',
        datetime: '2020-03-16',
        category: { title: 'Mount', href: '#' },
        author: {
            name: 'Kabupaten Probolinggo',
            role: 'Jawa Timur',
            href: '#',
            imageUrl:
                'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
    },
    // More posts...
];

export default function PlacesSection() {
    return (
        <div id="place-section" className="bg-white py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:mx-0">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        Journey through Paradise
                    </h2>
                    <p className="mt-2 text-lg leading-8 text-gray-600">
                        Embark on a Spectacular Adventure as We Uncover the
                        Magnificent Beauty and Cultural Richness of
                        Indonesia&apos;s Hidden Gems.
                    </p>
                </div>
                <div className="snap-x flex overflow-x-auto border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16">
                    {posts.map((post) => (
                        <article
                            key={post.id}
                            className="snap-center flex-shrink-0 w-96 flex flex-col items-start justify-between mx-2"
                        >
                            <figure className="my-3 h-56 w-full relative">
                                <Image
                                    src="/images/dummy/bromo.jpg"
                                    alt="Shoes"
                                    fill={true}
                                    className="rounded-xl object-cover"
                                />
                            </figure>
                            <div className="flex items-center gap-x-4 text-xs">
                                <a
                                    href={post.category.href}
                                    className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                                >
                                    {post.category.title}
                                </a>
                            </div>
                            <div className="group relative">
                                <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                                    <a href={post.href}>
                                        <span className="absolute inset-0" />
                                        {post.name}
                                    </a>
                                </h3>
                                <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
                                    {post.description}
                                </p>
                            </div>
                            <div className="relative mt-8 flex items-center gap-x-4">
                                <div className="text-sm leading-6">
                                    <p className="font-semibold text-gray-900">
                                        <a href={post.author.href}>
                                            <span className="absolute inset-0" />
                                            {post.author.name}
                                        </a>
                                    </p>
                                    <p className="text-gray-600">
                                        {post.author.role}
                                    </p>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </div>
    );
}
