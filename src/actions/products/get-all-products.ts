'use server'

import prisma from "@/lib/prisma";
import { getAttributeById } from "../attributes/get-attributes-by-id";
import { Product } from "@/interfaces";

export const getAllProducts = async () : Promise<Product[]> => {
    try {
        const products = await prisma.products.findMany();

        const updatedProducts = await Promise.all(
            products.map(async (product) => {
                const attributes = await getAttributeById(product.attribute_id);
                const { attribute_id, warranty_period, current_stock, ...rest } = product;
        
                return {
                    ...rest,
                    attributes,
                    currentStock: current_stock,
                    warrantyPeriod: warranty_period
                } as Product;
            })
        );
        
        return updatedProducts; 

    } catch (error) {
        console.log(error)
        throw new Error('Error al obtener los productos');
    }
}