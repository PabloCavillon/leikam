'use client'

import Link from "next/link";
import { LuPackage } from "react-icons/lu";
import { MdOutlineRequestQuote } from "react-icons/md";
import { FaPlus } from "react-icons/fa";

import { TableProducts } from "@/components";

export default function ProductsPage() {
    
    return (
        <div className="p-6 bg-gray-900 h-auto">
            <div className="mb-6 flex justify-end gap-3">
                <Link
                    href="/products/create"
                    className="bg-orange-600 text-white px-6 py-2 rounded-lg flex items-center gap-2 font-semibold shadow hover:bg-orange-500 transition"
                >
                    <FaPlus size={20} />
                    <span>Agregar producto</span>
                </Link>
                <Link
                    href="/quotes/create"
                    className="bg-orange-600 text-white px-6 py-2 rounded-lg flex items-center gap-2 font-semibold shadow hover:bg-orange-500 transition"
                >
                    <MdOutlineRequestQuote size={25} />
                    <span>Crear presupuesto</span>
                </Link>
                <Link
                    href="/kits/create"
                    className="bg-orange-600 text-white px-6 py-2 rounded-lg flex items-center gap-2 font-semibold shadow hover:bg-orange-500 transition"
                >
                    <LuPackage size={25} />
                    <span>Crear kit</span>
                </Link>
            </div>
            
            <TableProducts />
        </div>
    );
}