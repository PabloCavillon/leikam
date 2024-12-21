'use server'

import prisma from "@/lib/prisma";
import { getAttributeById } from "../attributes/get-attributes-by-id";
import { Product } from "@/interfaces";

export const getAllProducts = async () : Promise<Product[]> => {
    try {
        const products = await prisma.products.findMany();

        const updatedProducts = await Promise.all(
            products.map(async (product) => {
                const { attribute_id, ...rest } = product;

                return {
                    ...rest,
                } as Product;
            })
        );
        
        return updatedProducts; 

    } catch (error) {
        console.log(error)
        throw new Error('Error al obtener los productos');
    }
}