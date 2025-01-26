'use client';

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import clsx from "clsx";

import { Product } from "@/interfaces";
import { createProduct, getProductBySlug, updateProduct } from "@/actions";

type FormInputs = {
    name: string;
    model: string;
    description: string;
    price: number;
    current_stock: number;
    category: string;
};

interface Props {
    product?: Product;
}

export const ProductForm = ({ product }: Props) => {
    const {
        handleSubmit,
        register,
        reset,
    } = useForm<FormInputs>();

    const [isLoading, setIsLoading] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [productId, setProductId] = useState<string>("");
    const router = useRouter();

    useEffect(() => {
        const resolveParams = () => {
            if (product) {
                setIsEdit(true);
                setProductId(product.id);
                reset({
                    name: product.name,
                    model: product.model,
                    description: product.description,
                    price: product.price,
                    current_stock: product.current_stock,
                });
            }
            setIsLoading(true);
        };
        resolveParams();
    }, [product, reset]);

    const onSubmit = async (data: FormInputs) => {
        try {
            if (!isEdit) {
                const slug = data.name.replace(/ /g, "-");
                const product = await getProductBySlug(slug);

                if (product) return alert("Ya existe un producto con ese nombre");

                const dataCorrect = { ...data, slug, current_stock: parseInt(data.current_stock.toString()) };
                await createProduct(dataCorrect);
            } else {
                const dataCorrect = {
                    ...data,
                    id: productId,
                    current_stock: parseInt(data.current_stock.toString()),
                };

                await updateProduct(dataCorrect);
            }

            router.push(`/products`);
        } catch (err) {
            console.log("Hubo un problema al guardar el producto:", err);
        }
    };

    if (!isLoading) return <p>Cargando...</p>;

    return (
        <div className="flex justify-center items-center px-4 py-10 sm:px-6 lg:px-8">
            <form
                className="w-full max-w-4xl bg-gray-800 rounded-lg shadow-lg p-6 space-y-6"
                onSubmit={handleSubmit(onSubmit)}
            >
                <h2 className="text-2xl font-semibold text-gray-300 mb-4">
                    {isEdit ? "Editar Producto" : "Crear Producto"}
                </h2>
                <div className="flex flex-col gap-4">
                    <div>
                        <label className="block text-sm text-gray-300">Nombre *</label>
                        <input
                            type="text"
                            {...register("name", { required: true })}
                            className={clsx(
                                "w-full p-2 rounded",
                                !isEdit
                                    ? "bg-gray-700 border border-gray-600 text-gray-200 focus:ring-2 focus:ring-orange-500"
                                    : "hover:cursor-not-allowed bg-gray-600 text-gray-300"
                            )}
                            disabled={isEdit}
                        />
                    </div>
                    <div>
                        <label className="block text-sm text-gray-300">Modelo *</label>
                        <input
                            type="text"
                            {...register("model", { required: true })}
                            className={clsx(
                                "w-full p-2 rounded",
                                !isEdit
                                    ? "bg-gray-700 border border-gray-600 text-gray-200 focus:ring-2 focus:ring-orange-500"
                                    : "hover:cursor-not-allowed bg-gray-600 text-gray-300"
                            )}
                            disabled={isEdit}
                        />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm text-gray-300">Precio *</label>
                            <input
                                type="number"
                                step="0.01"
                                {...register("price", { required: true, valueAsNumber: true })}
                                className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-gray-200 focus:ring-2 focus:ring-orange-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-300">Stock Actual *</label>
                            <input
                                type="number"
                                {...register("current_stock", { required: true })}
                                className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-gray-200 focus:ring-2 focus:ring-orange-500"
                            />
                        </div>
                    </div>
                </div>
                <div>
                    <label className="block text-sm text-gray-300">Descripción *</label>
                    <textarea
                        {...register("description", { required: true })}
                        className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-gray-200 focus:ring-2 focus:ring-orange-500 resize-none"
                    ></textarea>
                </div>
                <button
                    type="submit"
                    className="w-full py-2 rounded bg-orange-600 text-gray-900 font-semibold hover:bg-orange-500"
                >
                    {isEdit ? "Actualizar" : "Guardar"}
                </button>
            </form>
        </div>
    );
};
