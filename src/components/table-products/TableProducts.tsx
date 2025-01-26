'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import clsx from "clsx";

import { getAllProducts } from "@/actions";
import { formatNumber } from "@/util";
import { useProductStore } from "@/store";

import { Product } from "@/interfaces";
import { useRouter } from "next/navigation";
import { FaRegTrashAlt } from "react-icons/fa";

interface ProductWithQuantity extends Product {
    quantity: number;
}

export const TableProducts = () => {
    const router = useRouter();

    const [productsList, setProductsList] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [filter, setFilter] = useState<string>("");
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

    const productsSelected = useProductStore((state) => state.productsSelected);
    const addProductToSelected = useProductStore((state) => state.addProductToSelected);
    const removeProductFromSelected = useProductStore((state) => state.removeProductFromSelected);
    const verifyProductIsSelected = useProductStore((state) => state.verifyProductIsSelected);

    const handleSelectProduct = (product: ProductWithQuantity) => {
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
                setProductsList(products);
                setFilteredProducts(products);
            } catch (error) {
                console.log("Error al obtener los productos", error);
            }
            setIsLoading(true);
        };
        fetchProducts();
    }, []);

    useEffect(() => {
        if (!filter) {
            setFilteredProducts(productsList);
            return;
        }

        const keywords = filter.toLowerCase().split(" ");
        const filtered = productsList.filter((product) =>
            keywords.every((keyword) =>
                product.name.toLowerCase().includes(keyword)
            )
        );

        setFilteredProducts(filtered);
    }, [filter, productsList, productsSelected]);

    if (!isLoading)
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="loader"></div>
            </div>
        );

    return (
        <div className="overflow-x-auto bg-gray-800 shadow-lg rounded-lg">
            <table className="table-auto w-full text-gray-300">
                <thead>
                    <tr className="bg-gray-800">
                        <td colSpan={6} className="p-4">
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
                        <th className="px-4 sm:px-6 py-3 text-left text-sm font-semibold uppercase">
                            Detalles
                        </th>
                        <th className="hidden sm:table-cell px-4 sm:px-6 py-3 text-center text-sm font-semibold uppercase">
                            Descripción
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {filteredProducts.map((product, index) => (
                        <tr
                            key={product.slug}
                            className={clsx(
                                "transition-all cursor-pointer",
                                verifyProductIsSelected(product.id)
                                    ? "bg-gray-200 text-gray-900 hover:bg-gray-300"
                                    : index % 2 === 0
                                    ? "bg-gray-700 hover:bg-gray-600"
                                    : "bg-gray-800 hover:bg-gray-600"
                            )}
                            onClick={() =>
                                handleSelectProduct({ ...product, quantity: 1 })
                            }
                            onDoubleClick={() => router.push(`/products/edit/${product.slug}`)}   
                        >
                            <td className="px-4 sm:px-6 py-4 text-sm">
                                <div>
                                    <span className="font-bold">
                                        {product.name}
                                    </span>
                                    <br />
                                    {/*<span className="text-gray-300">
                                        Modelo: {product.model}
                                    </span>*/}
                                </div>
                                <div className="mt-2">
                                    <span className="block text-sm">
                                        Precio: {formatNumber(product.price, 2)}
                                    </span>
                                    <span className="block text-sm">
                                        Stock: {product.current_stock}
                                    </span>
                                </div>
                            </td>
                            <td className="hidden sm:table-cell px-4 sm:px-6 py-4 text-sm text-center">
                                {product.description || "-"}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
