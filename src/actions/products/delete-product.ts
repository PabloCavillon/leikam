'use server'

import prisma from "@/lib/prisma";

export const deleteProduct = async(product_id: string) => {

    try {

        const product = await prisma.products.findUnique({
            where: {id: product_id}
        })

        if (!product)
            throw new Error("El producto no existe")

        const productUpdated = await prisma.products.update({
            where: {id: product_id},
            data: { 
                active: false
            }
        })

        if (!productUpdated)
            throw new Error("Ocurrio un problema al actualizar el producto")

        return productUpdated;

    } catch (error) {
        console.log(error);
        throw new Error("Ocurrio un problema al actualizar el producto")
    }

}