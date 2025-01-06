'use client'

import { getAllProducts } from "@/actions"
import { Product } from "@/interfaces"
import { useProductStore } from "@/store"
import { formatNumber } from "@/util"
import clsx from "clsx"
import Link from "next/link"
import { useEffect, useState } from "react"


interface ProductWithQuantity extends Product {
    quantity: number;
}

export const TableProducts = () => {

    const [productsList, setProductsList] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [filter, setFilter] = useState<string>("");
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

    const productsSelected = useProductStore((state) => state.productsSelected);
    const addProductToSelected = useProductStore((state) => state.addProductToSelected);
    const removeProductFromSelected = useProductStore((state) => state.removeProductFromSelected);
    const verifyProductIsSelected = useProductStore( (state) => state.verifyProductIsSelected);

     const handleSelectProduct = (product: ProductWithQuantity ) => {
        if (verifyProductIsSelected(product.id)) {
            removeProductFromSelected(product.id);
        } else {
            addProductToSelected(product);
        }
    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const products = await getAllProducts(); 
                setProductsList(products)
                setFilteredProducts(products)
            } catch (error) {
                console.log("Error al obtener los productos", error);
            }
            setIsLoading(true);
        }
        fetchProducts()
    }, [] )

    useEffect(() => {
        if (!filter) {
            setFilteredProducts(productsList);
            return;
        }
    
        const keywords = filter.toLowerCase().split(" "); // Dividir el filtro en palabras clave
        const filtered = productsList.filter((product) => {
            // Verificar que todas las palabras clave estén presentes en el nombre del producto
            return keywords.every((keyword) => 
                product.name.toLowerCase().includes(keyword)
            );
        });
    
        setFilteredProducts(filtered);
    }, [filter, productsList, productsSelected]);

    if (!isLoading)
        return <div className="flex justify-center items-center h-screen">
            <div className="loader"></div>
        </div>

    return (
        <div className="overflow-hidden shadow-lg rounded-lg bg-gray-800">
            <table className="table-auto w-full text-gray-300">
                <thead>
                    <tr className="bg-gray-800">
                        <td colSpan={7} className="p-4">
                            <div className="relative">
                                <input
                                    type="text"
                                    onChange={(e) => setFilter(e.target.value)}
                                    placeholder="Buscar productos..."
                                    className="w-full pl-10 pr-4 py-2 text-sm bg-gray-900 text-gray-300 border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                                />
                                <svg
                                    className="absolute left-3 top-2.5 w-5 h-5 text-gray-400"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M10 16l-4-4m0 0l4-4m-4 4h12"
                                    />
                                </svg>
                            </div>
                        </td>
                    </tr>
                    <tr className="bg-gradient-to-r from-orange-600 via-orange-500 to-orange-400 text-white">
                        <th className="px-6 py-3 text-center text-sm font-semibold uppercase">
                            Seleccionar
                        </th>
                        <th className="px-6 py-3 text-center text-sm font-semibold uppercase">
                            Nombre
                        </th>
                        <th className="px-6 py-3 text-center text-sm font-semibold uppercase">
                            Modelo
                        </th>
                        <th className="px-6 py-3 text-center text-sm font-semibold uppercase">
                            Descripción
                        </th>
                        <th className="px-6 py-3 text-center text-sm font-semibold uppercase">
                            Precio
                        </th>
                        <th className="px-6 py-3 text-center text-sm font-semibold uppercase">
                            Stock
                        </th>
                        <th className="px-6 py-3 text-center text-sm font-semibold uppercase">
                            Acción
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {filteredProducts.map((product, index) => (
                        <tr
                            key={product.slug}
                            className={clsx(
                                "transition-all",
                                index % 2 === 0
                                    ? "bg-gray-700 hover:bg-gray-600"
                                    : "bg-gray-800 hover:bg-gray-600"
                            )}
                        >
                            <td className="px-6 py-4 text-center">
                                <input
                                    onChange={() => handleSelectProduct({ ...product, quantity: 1 })}
                                    type="checkbox"
                                    className="hover:cursor-pointer w-4 h-4 text-orange-500 bg-gray-900 border-gray-600 rounded focus:ring-2 focus:ring-orange-500"
                                    checked={verifyProductIsSelected(product.id)}
                                />
                            </td>
                            <td className="px-6 py-4 text-sm text-center">
                                {product.name}
                            </td>
                            <td className="px-6 py-4 text-sm text-center">
                                {product.model}
                            </td>
                            <td className="px-6 py-4 text-sm text-center">
                                {product.description || "-"}
                            </td>
                            <td className="px-6 py-4 text-sm text-center">
                                {formatNumber(product.price, 2)}
                            </td>
                            <td className="px-6 py-4 text-sm text-center">
                                {product.current_stock}
                            </td>
                            <td className="px-6 py-4 flex justify-center gap-3">
                                <Link
                                    href={`/products/edit/${product.slug}`}
                                    className="text-blue-400 hover:text-blue-500 transition hover:underline"
                                >
                                    Editar
                                </Link>
                                <button
                                    onClick={() => console.log("Eliminar producto")}
                                    className="text-red-300 hover:text-red-400 transition hover:underline"
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}