'use server'

import { Attribute, Product } from "@/interfaces"
import prisma from "@/lib/prisma"

export const getProductByModel = async (model:string) : Promise<Product> => {

    try {
        const product = await prisma.products.findFirst({
            where: {model}
        }) 

        if (!product){
            throw new Error('No se encuentra el producto con el modelo: ' + model);
        }   

        const { current_stock, warranty_period, attribute_id, ...rest  } = product;


        return {
            currentStock: current_stock,
            warrantyPeriod: warranty_period,
            ...rest
        };

    } catch (error) {
        console.log(error)
        throw new Error('No se encuentra el producto con el modelo: ' + model);
    }

}