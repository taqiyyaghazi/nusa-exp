'use client';
import SideBar from '@/components/dashboard/SideBar';
import '../../globals.css';
import ComplexNavbar from '@/components/dashboard/Navbar';

const RootLayout = ({ children }) => {
    return (
        <html lang="en" className="bg-white">
            <body>
                <ComplexNavbar />
                <SideBar />
                <main className="md:ml-[22rem] mt-20 ml-5 mr-5 mb-5">{children}</main>
            </body>
        </html>
    );
};

export default RootLayout;
