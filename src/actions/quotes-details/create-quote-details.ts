'use server'

import prisma from "@/lib/prisma";
import { Product } from "@/interfaces";

interface ProductWithQuantity extends Product{
    quantity: number;
}

export const createQuoteDetails = async (products: ProductWithQuantity[], quote_id: string) => {
    try {
        // Crear las promesas para cada producto
        const quoteDetailsPromises = products.map((product) =>
            prisma.quote_Details.create({
                data: {
                    quote_id,
                    product_id: product.id,
                    quantity: product.quantity,
                    unit_price: product.price,
                },
            })
        );

        // Ejecutar todas las operaciones en paralelo
        await Promise.all(quoteDetailsPromises);

        return {
            ok: true,
        };
    } catch (error) {
        console.error("Error en el servidor:", error);
        throw new Error("Ocurrió un problema en el servidor");
    }
};