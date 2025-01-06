'use server'

import { Product } from "@/interfaces"
import prisma from "@/lib/prisma"

export const getProductByModel = async (model:string) : Promise<Product | null> => {

    try {
        const product = await prisma.products.findFirst({
            where: {model}
        }) 

        if (!product)
            return null;

        const { current_stock, warranty_period, ...rest  } = product;


        return {
            current_stock: current_stock,
            warranty_period: warranty_period,
            ...rest
        };

    } catch (error) {
        console.log(error)
        throw new Error('No se encuentra el producto con el modelo: ' + model);
    }

}