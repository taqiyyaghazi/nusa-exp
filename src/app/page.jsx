'use client';

import ComingSoon from '@/components/ComingSoon';
import AboutUsSection from '@/components/sections/AboutUsSection';
import CTASection from '@/components/sections/CTASection';
import HeroSection from '@/components/sections/HeroSection';
import PlacesSection from '@/components/sections/PlacesSection';

export default function Home() {
    return (
        <main>
            <HeroSection />
            <PlacesSection />
            <AboutUsSection />
            <CTASection />
        </main>
    );
}
