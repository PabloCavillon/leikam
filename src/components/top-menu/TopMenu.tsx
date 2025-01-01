'use client';

import Link from 'next/link';
import { useState } from 'react';
import { titleFont } from '@/config/fonts';

export const TopMenu = () => {
    const [isMenuOpen, setMenuOpen] = useState(false);

    return (
        <nav className="flex px-5 h-16 justify-between items-center w-full bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 text-white shadow-md">
            {/* Logo */}
            <div>
                <Link href="/" className="flex items-center">
                    <span className={`${titleFont.className} font-bold text-xl`}>Leikam</span>
                    <span className="ml-2 text-sm font-light">| Sistema de Gestión</span>
                </Link>
            </div>

            {/* Center Menu for Large Screens */}
            <div className="hidden sm:flex space-x-4">
                <Link
                    className="px-3 py-2 rounded-md text-sm font-medium transition-all hover:bg-orange-600 hover:shadow"
                    href="/quotes"
                >
                    Presupuestos
                </Link>
                <Link
                    className="px-3 py-2 rounded-md text-sm font-medium transition-all hover:bg-orange-600 hover:shadow"
                    href="/workOrder"
                >
                    Órdenes de Trabajo
                </Link>
                <Link
                    className="px-3 py-2 rounded-md text-sm font-medium transition-all hover:bg-orange-600 hover:shadow"
                    href="/technicians"
                >
                    Técnicos
                </Link>
                <Link
                    className="px-3 py-2 rounded-md text-sm font-medium transition-all hover:bg-orange-600 hover:shadow"
                    href="/products"
                >
                    Productos
                </Link>
                <Link
                    className="px-3 py-2 rounded-md text-sm font-medium transition-all hover:bg-orange-600 hover:shadow"
                    href="/promocionalKits"
                >
                    Kits Promocionales
                </Link>
            </div>

            {/* Hamburger Menu for Small Screens */}
            <div className="sm:hidden">
                <button
                    onClick={() => setMenuOpen(!isMenuOpen)}
                    className="flex items-center justify-center w-10 h-10 bg-orange-600 rounded-full focus:outline-none hover:bg-orange-500"
                >
                    <span className="sr-only">Abrir menú</span>
                    <div className="space-y-1">
                        <div className="w-6 h-0.5 bg-white"></div>
                        <div className="w-6 h-0.5 bg-white"></div>
                        <div className="w-6 h-0.5 bg-white"></div>
                    </div>
                </button>
            </div>

            {/* Dropdown Menu for Small Screens */}
            {isMenuOpen && (
                <div className="absolute top-16 left-0 w-full bg-orange-700 text-white shadow-lg z-50 sm:hidden">
                    <Link
                        className="block px-5 py-3 text-sm font-medium hover:bg-orange-600"
                        href="/quotes"
                        onClick={() => setMenuOpen(false)}
                    >
                        Presupuestos
                    </Link>
                    <Link
                        className="block px-5 py-3 text-sm font-medium hover:bg-orange-600"
                        href="/workOrder"
                        onClick={() => setMenuOpen(false)}
                    >
                        Órdenes de Trabajo
                    </Link>
                    <Link
                        className="block px-5 py-3 text-sm font-medium hover:bg-orange-600"
                        href="/technicians"
                        onClick={() => setMenuOpen(false)}
                    >
                        Técnicos
                    </Link>
                    <Link
                        className="block px-5 py-3 text-sm font-medium hover:bg-orange-600"
                        href="/products"
                        onClick={() => setMenuOpen(false)}
                    >
                        Productos
                    </Link>
                    <Link
                        className="block px-5 py-3 text-sm font-medium hover:bg-orange-600"
                        href="/promocionalKits"
                        onClick={() => setMenuOpen(false)}
                    >
                        Kits Promocionales
                    </Link>
                </div>
            )}
        </nav>
    );
};
