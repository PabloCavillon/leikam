'use server'

import { Product } from "@/interfaces"
import prisma from "@/lib/prisma"

export const getProductBySlug = async (slug:string) : Promise<Product> => {

    try {
        const product = await prisma.products.findFirst({
            where: {slug}
        }) 

        if (!product)        
            throw new Error("El producto no existe")

        return product;

    } catch (error) {
        console.log(error)
        throw new Error("Ocurrió un problema al obtener el producto")
    }

}