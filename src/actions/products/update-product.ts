'use server'

import { Product } from "@/interfaces"
import prisma from "@/lib/prisma";

export const updateProduct = async(product: Product) => {

    try {

        const productUpdated = await prisma.products.update({
            where: {id: product.id},
            data: product
        })

        if (!productUpdated)
            throw new Error("Ocurrio un problema al actualizar el producto")

        return productUpdated;

    } catch (error) {
        console.log(error);
        throw new Error("Ocurrio un problema al actualizar el producto")
    }

}