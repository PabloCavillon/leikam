'use server'

import { ProductKit } from "@/interfaces";
import prisma from "@/lib/prisma";
import { getProductById } from "../products/get-product-by-id";

export const getAllProductKits = async (id: string) : Promise<ProductKit[]> => {
    try {
        const productKits = await prisma.products_Kits.findMany({
            where: {
                kit_id: id
            }
        });

        const productsUpdated = Promise.all(productKits.map(async (product) => {
            const {product_id, ...rest} = product;
            const productData = await getProductById(product_id);

            return { ...rest, product: productData }
        }))

        return productsUpdated;

    } catch (error) {
        console.log(error)
        throw new Error('Error al obtener los productos');
    }
}