'use client'

import { Product } from "@/interfaces"
import clsx from "clsx"
import { useForm } from "react-hook-form"

type FormInputs = {
    description: string,
    currentStock: number,
    name: string,
    price:number,
}

interface Props {
    product: Product
}

export const ProductForm = ({product}: Props) => {

    const { handleSubmit, register, formState: {isValid}, reset } = useForm<FormInputs>({
        defaultValues: {}
    })

    const onSubmit = async (data:FormInputs) => {

    }

    return (

        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-2 sm:gap-5 sm:grid-cols-4 p-3">
            <div className="flex flex-col mb-2 p-2 col-span-2">
                <span>Nombre</span>
                <input type="text" {...register('name', {required: true})} value={product.name} />
            </div>
            <div className="flex flex-col mb-2 p-2">
                <span>Stock Actual</span>
                <input type="number" {...register('currentStock', {required: true})} value={product.currentStock}/>
            </div>
            <div className="flex flex-col mb-2 p-2">
                <span>Precio</span>
                <input type="number" {...register('price', {required: true})} value={product.price}/>
            </div>
            <div className="flex flex-col mb-2 p-2 col-span-4">
                <span>Descripción</span>
                <textarea className="w-full max-h-96 min-h-32 p-2 border border-gray-300 rounded-md " placeholder="Escribe aquí..."   {...register('description', {required: true})} />
            </div>

            <button 
                type="submit" 
                className={clsx({
                    "btn-primary flex w-full justify-center": isValid, 
                    "btn-disabled flex w-full justify-center": !isValid
                })}
            >
                Guardar
            </button>
        </form>
    )
}