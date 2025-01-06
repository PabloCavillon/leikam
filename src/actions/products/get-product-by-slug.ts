'use server'

import { Product } from "@/interfaces"
import prisma from "@/lib/prisma"

export const getProductBySlug = async (slug:string) : Promise<Product | null> => {

    try {
        const product = await prisma.products.findFirst({
            where: {slug}
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
        return null;
    }

}