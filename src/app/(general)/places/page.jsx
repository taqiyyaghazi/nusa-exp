'use client';
import Card from '@/components/ui/Card';
import { useGetAllPlacesQuery } from '@/services/api/placesApi';

export default function Places() {
    const { data, error, isLoading } = useGetAllPlacesQuery();
    console.log(data);
    return (
        <main>
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
                    <div className="md:flex flex-wrap gap-2 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16">
                        {!isLoading &&
                            data.data.map((data) => (
                                <Card key={data.id} data={data} />
                            ))}
                    </div>
                </div>
            </div>
        </main>
    );
}
