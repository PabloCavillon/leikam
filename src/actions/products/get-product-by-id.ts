'use server'

import { Attribute, Product } from "@/interfaces"
import prisma from "@/lib/prisma"
import { getAttributeById } from "../attributes/get-attributes-by-id"

export const getProductById = async (id:string) : Promise<Product> => {

    try {
        const product = await prisma.products.findFirst({
            where: {id}
        }) 

        if (!product){
            throw new Error('No se encuentra el producto con el slug: ' + id);
        }   

        const { current_stock, warranty_period, attribute_id, ...rest  } = product;
        const attributes:Attribute = await getAttributeById(attribute_id);


        return {
            currentStock: current_stock,
            warrantyPeriod: warranty_period,
            attributes,
            ...rest
        };

    } catch (error) {
        console.log(error)
        throw new Error('No se encuentra el producto con el id: ' + id);
    }

}