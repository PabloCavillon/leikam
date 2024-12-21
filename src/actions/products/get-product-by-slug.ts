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

        const { current_stock, warranty_period, attribute_id, ...rest  } = product;
        //const attributes:Attribute = await getAttributeById(attribute_id);


        return {
            current_stock: current_stock,
            warranty_period: warranty_period,
            //attributes,
            ...rest
        };

    } catch (error) {
        console.log(error)
        return null;
    }

}