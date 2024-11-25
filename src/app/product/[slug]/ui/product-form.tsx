'use client'

import { Product } from "@/interfaces"
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

        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col mb-2">
                <span>Nombre {product.name}</span>
                <input type="text" {...register('name', {required: true})} />
            </div>
            <div className="flex flex-col mb-2">
                <span>Descripción {product.description}</span>
                <input type="text" {...register('description', {required: true})} />
            </div>
            <div className="flex flex-col mb-2">
                <span>Stock Actual {product.currentStock}</span>
                <input type="text" {...register('currentStock', {required: true})}/>
            </div>
            <div className="flex flex-col mb-2">
                <span>Precio {product.price}</span>
                <input type="text" {...register('price', {required: true})} />
            </div>
        </form>
    )
}