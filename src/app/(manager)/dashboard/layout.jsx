'use client';
import SideBar from '@/components/dashboard/SideBar';
import '../../globals.css';
import ComplexNavbar from '@/components/dashboard/Navbar';
import Providers from '@/components/Providers';

const RootLayout = ({ children }) => {
    return (
        <html lang="en" className="bg-white">
            <body>
                <Providers>
                    <ComplexNavbar />
                    <SideBar />
                    <main className="md:ml-[22rem] mt-20 ml-5 mr-5 mb-5">
                        {children}
                    </main>
                </Providers>
            </body>
        </html>
    );
};

export default RootLayout;
