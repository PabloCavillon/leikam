'use client'

import { createProduct, getProductByModel, getProductBySlug } from "@/actions"
import { redirect } from "next/navigation"
import { useForm } from "react-hook-form"

type FormInputs = {
    name: string, 
    model: string, 
    description: string, 
    price: number, 
    currentStock: number,
    category: string,
}

export const ProductForm = () => {
    const {handleSubmit, register } = useForm<FormInputs>({
        defaultValues: {}
    })

    const onSubmit = async (data: FormInputs) => {
        const slug = data.name.replace(/ /g, "-");

        let product = await getProductBySlug(slug); 

        if (product) return alert("Ya existe un producto con ese nombre");

        product = await getProductByModel(data.model);

        if (product) return alert("Ya existe un producto con ese modelo");

        const dataCorrect = { ...data, slug, currentStock: parseInt(data.currentStock.toString()) }
        const {slug: slugDB} = await createProduct(dataCorrect);
        if (!slugDB)
            alert("Se produjo un error al crear el producto")
    
        redirect(`/product/${slug}`)
    }   

    return (
        <div className="flex flex-col w-full items-center">
            <form className="flex gap-5 flex-col p-5" onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <span>Nombre</span>
                    <input type="text" {...register("name", {required: true})} />
                </div>
                <div>
                    <span>Modelo</span>
                    <input type="text" {...register("model", {required: true})} />
                </div>
                <div>
                    <span>Precio</span>
                    <input type="number" step={"0.01"} {...register("price", {required:true, valueAsNumber: true})} />
                </div>
                <div>
                    <span>Stock actual</span>
                    <input type="number" {...register("currentStock",{required: true})} />
                </div>
                <div>
                    <span>Descripción</span>
                    <textarea {...register("description", {required: true})} />
                </div>
                <button type="submit">Cargar producto</button>
            </form>
        </div> 
    )
}