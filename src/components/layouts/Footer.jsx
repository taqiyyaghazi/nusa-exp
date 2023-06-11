import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300">
            <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold">Tentang Kami</h3>
                        <p>Deskripsi tentang perusahaan atau tim Anda.</p>
                    </div>
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold">Produk</h3>
                        <ul className="list-disc list-inside">
                            <li>Produk 1</li>
                            <li>Produk 2</li>
                            <li>Produk 3</li>
                        </ul>
                    </div>
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold">Layanan</h3>
                        <ul className="list-disc list-inside">
                            <li>Layanan 1</li>
                            <li>Layanan 2</li>
                            <li>Layanan 3</li>
                        </ul>
                    </div>
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold">Kontak</h3>
                        <p>Email: info@example.com</p>
                        <p>Telepon: 123-456-7890</p>
                    </div>
                </div>
                <div className="mt-8 text-center">
                    <p>
                        &copy; {new Date().getFullYear()} Nusantara Expolorer. Hak
                        Cipta Dilindungi.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
