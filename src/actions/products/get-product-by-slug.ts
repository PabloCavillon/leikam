'use server'

import { Attribute, Product } from "@/interfaces"
import prisma from "@/lib/prisma"
import { getAttributeById } from "../attributes/get-attributes-by-id"

export const getProductBySlug = async (slug:string) : Promise<Product | null> => {

    try {
        const product = await prisma.products.findFirst({
            where: {slug}
        }) 

        if (!product){
            console.log("No se encuentra el producto con el slug: " + slug);
            return null;
        }   

        const attributes:Attribute = await getAttributeById(product.attribute_id);

        const { current_stock, warranty_period, attribute_id, ...rest  } = product;

        return {
            currentStock: current_stock,
            warrantyPeriod: warranty_period,
            attributes,
            ...rest
        };

    } catch (error) {
        console.log(error)
        return null;
    }

}