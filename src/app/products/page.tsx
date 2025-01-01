'use client'

import { getAllProducts } from "@/actions";
import Link from "next/link";
import { useEffect } from "react";
import { useProductStore } from "@/store";
import { Product } from "@/interfaces";
import { formatNumber } from '../../util/format-number';

export default function ProductsPage() {
    
    const productsList = useProductStore((state) => state.productsList);
    const productsSelected = useProductStore((state) => state.productsSelected);
    const loadProductsList = useProductStore((state) => state.loadProductsList);
    const addProductToSelected = useProductStore((state) => state.addProductToSelected);
    const removeProductFromSelected = useProductStore((state) => state.removeProductFromSelected);
    const verifyProductIsSelected = useProductStore( (state) => state.verifyProductIsSelected);
    
    const handleChangeCheckBox = (product: Product ) => {

        if (verifyProductIsSelected(product.id)) {
            removeProductFromSelected(product.id);
        } else {
            addProductToSelected(product);
        }
    };
    
    useEffect(() => {
        const resolveData = async () => {
            const products = await getAllProducts();
            loadProductsList(products);
        }
        resolveData();
    }, []);

    useEffect(() => {}, [productsList, productsSelected]);

    return (
        <div className="p-6 bg-gray-900 h-auto">
            <div className="mb-6 flex justify-end gap-3">
                <Link
                    href="/products/create"
                    className="bg-orange-600 text-white px-6 py-2 rounded-lg font-semibold shadow hover:bg-orange-500 transition"
                >
                    Agregar producto
                </Link>
                <Link
                    href="/quotes/create"
                    className="bg-orange-600 text-white px-6 py-2 rounded-lg font-semibold shadow hover:bg-orange-500 transition"
                >
                    Crear presupuesto
                </Link>
            </div>
            {productsList.length > 0 && (
                <div className="overflow-hidden shadow-lg rounded-lg bg-gray-800">
                    <table className="table-auto w-full text-gray-300">
                        <thead className="bg-gradient-to-r from-orange-600 via-orange-500 to-orange-400 text-white">
                            <tr>
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
                                    Categoría
                                </th>
                                <th className="px-6 py-3 text-center text-sm font-semibold uppercase">
                                    Acción
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {productsList.map((product, index) => (
                                <tr
                                    key={product.slug}
                                    className={
                                        index % 2 === 0
                                            ? "bg-gray-700 hover:bg-gray-600"
                                            : "bg-gray-800 hover:bg-gray-600"
                                    }
                                >
                                    <td className="px-6 py-4 text-center">
                                        <input
                                            onChange={() => handleChangeCheckBox(product) }
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
                                        {formatNumber(product.price,2)}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-center">
                                        {product.current_stock}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-center">
                                        {product.category}
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
            )}
            {productsList.length === 0 && (
                <p className="text-center text-gray-500 mt-4">
                    No hay productos cargados.
                </p>
            )}
        </div>
    );
}