'use client'

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { CiEdit } from "react-icons/ci";
import { TiDeleteOutline } from "react-icons/ti";
import clsx from "clsx";

import { formatNumber } from "@/util";
import { useProductStore } from "@/store";
import { createKit } from "@/actions";
import { ProductsModal } from "@/components";

interface kit {
    name: string;
    price: number;
    expiration_date?: Date;
}   

export default function CreateKitPage() {
 
    const router = useRouter();

    const {register, handleSubmit, formState:{isValid} } = useForm<kit>();
    const [editQuantityProductOpen, setEditQuantityProductOpen] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const productsSelected = useProductStore((state) => state.productsSelected);
    const removeProductFromSelected = useProductStore((state) => state.removeProductFromSelected);
    const updateQuantityProductSelected = useProductStore((state) => state.updateQuantityProductSelected);
    const emptyProductsSelected = useProductStore((state) => state.emptyProductsSelected);

    const handlechangeQuantityProduct = (id: string, quantity: number) => {
        updateQuantityProductSelected(id, quantity);
    } 

    const showProductsModal = () => {
        setIsModalOpen(true);
    }

    const onSubmit = async (data: kit) => {
        const {ok} = await createKit({...data, products: productsSelected});

        if (ok ) {
            emptyProductsSelected();
            router.push("/kits");
        }
    }

    return (
        <div className="flex justify-center items-center pt-10 bg-gray-900 p-6">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full max-w-3xl bg-gray-800 rounded-lg shadow-lg p-6 space-y-6"
            >
                {/* Campo Nombre */}
                <div className="space-y-2">
                    <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-300"
                    >
                        Nombre *
                    </label>
                    <input
                        {...register("name", { required: true })}
                        type="text"
                        id="name"
                        className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-gray-200 focus:ring-2 focus:ring-orange-500"
                    />
                </div>

                {/* Campo Precio y Fecha Expiración */}
                <div className="flex gap-6">
                    {/* Campo Precio */}
                    <div className="flex flex-col w-1/2">
                        <label
                            htmlFor="price"
                            className="block text-sm font-medium text-gray-300"
                        >
                            Precio (AR$) *
                        </label>
                        <input
                            {...register("price", { required: true })}
                            type="number"
                            id="price"
                            className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-gray-200 focus:ring-2 focus:ring-orange-500"
                        />
                    </div>

                    {/* Campo Fecha Expiración */}
                    <div className="flex flex-col w-1/2">
                        <label
                            htmlFor="expiration_date"
                            className="block text-sm font-medium text-gray-300"
                        >
                            Fecha expiración
                        </label>
                        <input
                            {...register("expiration_date")}
                            type="date"
                            id="expiration_date"
                            className="w-full p-2 h-[42px] rounded bg-gray-700 border border-gray-600 text-gray-200 focus:ring-2 focus:ring-orange-500"
                        />
                    </div>
                </div>

                {/* Campo Descripción
                <div className="space-y-2">
                    <label
                        htmlFor="description"
                        className="block text-sm font-medium text-gray-300"
                    >
                        Descripción
                    </label>
                    <textarea
                        {...register("description")}
                        id="description"
                        className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-gray-200 focus:ring-2 focus:ring-orange-500 resize-none"
                        rows={4}
                    ></textarea>
                </div> */}

                {/* Lista de productos seleccionados */}
                <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-gray-300 border-b border-gray-600 pb-2">
                        Productos incluidos
                    </h3>
                    <ul className="bg-gray-700 rounded-lg p-4 space-y-3">
                        {productsSelected.map((product) => (
                            <li
                                key={product.id}
                                className="flex justify-between items-center text-gray-300 p-2 rounded hover:bg-gray-600"
                            >
                                <span>{product.name}</span>
                                <div className="flex items-center gap-3">
                                    <span
                                        className={clsx(
                                            "text-lg font-bold flex justify-center items-center gap-1 text-orange-500 hover:cursor-pointer hover:underline transition",
                                            editQuantityProductOpen && "hidden"
                                        )}
                                        onClick={() => setEditQuantityProductOpen(true)}
                                    >
                                        {formatNumber(product.quantity, 0)} <CiEdit size={22}/>
                                    </span>
                                    <span
                                        className={clsx(
                                            "text-lg font-bold text-orange-500 flex items-center gap-3",
                                            !editQuantityProductOpen && "hidden"
                                        )}
                                    >
                                        <input
                                            type="number"
                                            value={product.quantity}
                                            onKeyDown={(e) => e.key === 'Enter' && setEditQuantityProductOpen(false)}
                                            onChange={(e) => handlechangeQuantityProduct(product.id, Number(e.target.value))}
                                            className="w-16 text-center p-1 rounded bg-gray-700 border border-gray-600 text-gray-200 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                                        />
                                    </span>
                                    <TiDeleteOutline
                                        size={25}
                                        className="text-red-500 hover:text-red-400 cursor-pointer"
                                        onClick={() => removeProductFromSelected(product.id)}
                                    />
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Botón Crear Kit */}
                <div className="flex justify-center items-center gap-3">
                    <button
                        type="submit"
                        className={clsx("bg-orange-600 text-gray-900 px-6 py-2 rounded-lg text-lg font-semibold transition",
                            isValid ? "hover:bg-orange-500 cursor-pointer" : "btn-disabled cursor-not-allowed"
                        )}
                        >
                        Crear kit
                    </button>
                    <button 
                        onClick={() => showProductsModal()}
                        className="bg-orange-600 text-gray-900 px-6 py-2 rounded-lg text-lg font-semibold hover:bg-orange-500 transition"
                        >
                        Agregar productos
                    </button>
                </div>
            </form>
            {isModalOpen && <ProductsModal handleClose={() => {setIsModalOpen(false)}} />}
        </div>


    );
}