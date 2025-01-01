'use server'

import { Product } from "@/interfaces"
import prisma from "@/lib/prisma";

interface ProductUpdated {
    id: string;
    current_stock: number;
    name: string;
    model: string;
    description: string;
    price: number;
    category: string;
}

export const updateProduct = async(data: ProductUpdated) => {

    try {

        const {id: productUpdatedId} = await prisma.products.update({
            where: {id: data.id},
            data,
            select:{
                id:true,
            }
        })

        if (!productUpdatedId)
            throw new Error("Ocurrio un problema al actualizar el producto")

        return productUpdatedId;

    } catch (error) {
        console.log(error);
        throw new Error("Ocurrio un problema al actualizar el producto")
    }

}