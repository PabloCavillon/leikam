'use server'

import { Attribute, Product } from "@/interfaces"
import prisma from "@/lib/prisma"

export const getProductById = async (id:string) : Promise<Product> => {

    try {
        const product = await prisma.products.findFirst({
            where: {id}
        }) 

        if (!product){
            throw new Error('No se encuentra el producto con el slug: ' + id);
        }   

        const { attribute_id, ...rest  } = product;


        return { ...rest };

    } catch (error) {
        console.log(error)
        throw new Error('No se encuentra el producto con el id: ' + id);
    }

}