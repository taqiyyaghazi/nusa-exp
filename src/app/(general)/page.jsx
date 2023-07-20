'use client';

import AboutUsSection from '@/components/sections/AboutUsSection';
import CTASection from '@/components/sections/CTASection';
import HeroSection from '@/components/sections/HeroSection';
import PlacesSection from '@/components/sections/PlacesSection';
import { useGetAllPlacesQuery } from '@/services/api/placesApi';

export default function Home() {
    const { data, error, isLoading } = useGetAllPlacesQuery();
    return (
        <main>
            <HeroSection />
            <PlacesSection datas={data?.data} isLoading={isLoading}/>
            <AboutUsSection />
            <CTASection />
        </main>
    );
}
