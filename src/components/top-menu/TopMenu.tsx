'use client'

import Link from "next/link"
import { titleFont } from "@/config/fonts"
import { IoSearchOutline } from "react-icons/io5"

export const TopMenu = () => {


    return (
        <nav className="flex px-5 h-12 justify-between items-center w-full bg-custom-orange text-white">
        {/* Logo */}
        <div>
          <Link href="/">
            <span className={`${titleFont.className} antialiased font-bold`}>
                Leikam
            </span>
            <span> | Sistema de Gestión</span>
          </Link>
        </div>
  
        {/* Center Menu */}
        <div className="hidden sm:block">
          <Link
            className="m-2 p-2 rounded-md transition-all hover:bg-gray-100 hover:text-black"
            href="quotes"
          >
            Presupuestos
          </Link>
          <Link
            className="m-2 p-2 rounded-md transition-all hover:bg-gray-100  hover:text-black"
            href="workOrder"
          >
            Ordenes de Trabajo
          </Link>
          <Link
            className="m-2 p-2 rounded-md transition-all hover:bg-gray-100 hover:text-black"
            href="/technicians"
          >
            Técnicos
          </Link>
          <Link
            className="m-2 p-2 rounded-md transition-all hover:bg-gray-100 hover:text-black"
            href="/products"
          >
            Productos
          </Link>
          <Link
            className="m-2 p-2 rounded-md transition-all hover:bg-gray-100 hover:text-black"
            href="/promocionalKits"
          >
            Kits Promocionales
          </Link>
        </div>
  
      </nav>
    )


}