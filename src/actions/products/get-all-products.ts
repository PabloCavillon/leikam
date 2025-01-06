'use server'

import prisma from "@/lib/prisma";
import { Product } from "@/interfaces";

export const getAllProducts = async () : Promise<Product[]> => {
    try {
        const products = await prisma.products.findMany();
        return products; 
    } catch (error) {
        console.log(error)
        throw new Error('Error al obtener los productos');
    }
}