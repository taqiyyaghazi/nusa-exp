import Image from 'next/image';
import { useEffect } from 'react';
import Card from '../ui/Card';

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

export default function PlacesSection({ datas, isLoading }) {
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
                <div className="md:flex gap-2 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16">
                    {!isLoading &&
                        datas.slice(0, 3).map((data) => <Card key={data.id} data={data} />)}
                </div>
            </div>
        </div>
    );
}
