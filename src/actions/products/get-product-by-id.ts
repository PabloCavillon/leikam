'use server'

import { Attribute, Product } from "@/interfaces"
import prisma from "@/lib/prisma"

export const getProductById = async (id:string) : Promise<Product> => {

    try {
        const product = await prisma.products.findFirst({
            where: {id}
        }) 

        if (!product){
            throw new Error('No se encuentra el producto con el id: ' + id);
        }   

        return product;

    } catch (error) {
        console.log(error)
        throw new Error('No se encuentra el producto con el id: ' + id);
    }

}