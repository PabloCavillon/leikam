'use client'

import Link from "next/link";

import { Product } from "@/interfaces";
import { useProductStore } from "@/store";

interface Props {
    products: Product[];
}

export const TableProducts =  ({ products }: Props) => {

    //const productList = useProductStore(state => state.productsList);
    const addProductToList  = useProductStore(state => state.addProductToList);
    const removeProductToList  = useProductStore(state => state.removeProductToList);
    const verifyProductInList = useProductStore(state => state.verifyProductInList);
    
    const handlechange = async (event:React.ChangeEvent<HTMLInputElement>, product:Product) => {
        const {checked} = event.target;
        if (checked) {
            await addProductToList(product)
        }
        else {
            await removeProductToList(product)
        }
    }

    return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="p-4"/>
                    <th scope="col" className="px-6 py-3">
                        Nombre
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Modelo
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Descripcion
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Precio
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Stock
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Categoria
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Action
                    </th>
                </tr>
            </thead>
            <tbody>
                {
                    products.map(product => 
                        <tr key={product.slug} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td className="w-4 p-4">
                                <div className="flex items-center">
                                    <input 
                                        onChange={(event) => handlechange(event, product)} 
                                        id="checkbox-table-search-1" 
                                        type="checkbox" 
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" 
                                        checked={verifyProductInList(product)}
                                    />
                                    <label htmlFor="checkbox-table-search-1" className="sr-only">checkbox</label>
                                </div>
                            </td>
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {product.name}
                            </th>
                            <td className="px-6 py-4">
                                {product.model}
                            </td>
                            <td className="px-6 py-4">
                                {product.description || "-"}
                            </td>
                            <td className="px-6 py-4">
                                {product.price}
                            </td>
                            <td className="px-6 py-4">
                                {product.currentStock}
                            </td>
                            <td className="px-6 py-4">
                                {product.category}
                            </td>
                            <td className="flex items-center px-6 py-4">
                                <Link href={'/product/' + product.slug} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</Link>
                                {
                                    //<Link href="#" className="font-medium text-red-600 dark:text-red-500 hover:underline ms-3">Remove</Link>
                                }
                            </td>
                        </tr>
                    )
                }
            </tbody>
        </table>
        <Link href="/quote">Armar presupuesto</Link>
    </div>

    )
}