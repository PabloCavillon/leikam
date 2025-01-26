'use client';

import Link from "next/link";
import { LuPackage } from "react-icons/lu";
import { MdOutlineRequestQuote } from "react-icons/md";
import { FaPlus } from "react-icons/fa";

import { TableProducts } from "@/components";

export default function ProductsPage() {
    return (
        <div className="w-full h-full flex flex-col items-center justify-center">
            <div className="p-4 sm:p-6  h-auto w-4/5 flex flex-col gap-3">
                <div className="mb-6 flex flex-col sm:flex-row justify-end sm:gap-3 gap-4 items-stretch sm:items-center">
                    <Link
                        href="/products/create"
                        className="bg-orange-600 text-white px-4 sm:px-6 py-2 rounded-lg flex items-center gap-2 font-semibold shadow hover:bg-orange-500 transition justify-center"
                    >
                        <FaPlus size={20} />
                        <span>Agregar producto</span>
                    </Link>
                    <Link
                        href="/quotes/create"
                        className="bg-orange-600 text-white px-4 sm:px-6 py-2 rounded-lg flex items-center gap-2 font-semibold shadow hover:bg-orange-500 transition justify-center"
                    >
                        <MdOutlineRequestQuote size={25} />
                        <span>Crear presupuesto</span>
                    </Link>
                    <Link
                        href="/kits/create"
                        className="bg-orange-600 text-white px-4 sm:px-6 py-2 rounded-lg flex items-center gap-2 font-semibold shadow hover:bg-orange-500 transition justify-center"
                    >
                        <LuPackage size={25} />
                        <span>Crear kit</span>
                    </Link>
                </div>

                <TableProducts />
            </div>
        </div>
    );
}
