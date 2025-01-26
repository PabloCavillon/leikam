'use server'

import prisma from "@/lib/prisma";
import { Kit, Product } from "@/interfaces";

interface ProductWithQuantity extends Product{
    quantity: number;
}

interface KitWithQuantity extends Kit {
    quantity: number;
} 

export const createQuoteDetails = async (kits: KitWithQuantity[], products: ProductWithQuantity[], quote_id: string) => {
    try {
        // Crear las promesas para cada producto
        const quoteDetailsPromisesProducts = products.map((product) =>
            prisma.quote_Details.create({
                data: {
                    quote_id,
                    product_id: product.id,
                    quantity: product.quantity,
                    unit_price: product.price,
                },
            })
        );

        // Crear las promesas para cada kit
        const quoteDetailsPromisesKits = kits.map((kit) =>
            prisma.quote_Details.create({
                data: {
                    quote_id,
                    kit_id: kit.id,
                    quantity: kit.quantity,
                    unit_price: kit.price,
                },
            })
        );

        // Ejecutar todas las operaciones en paralelo
        await Promise.all(quoteDetailsPromisesProducts);
        await Promise.all(quoteDetailsPromisesKits);

    } catch (error) {
        console.error("Error en el servidor:", error);
        throw new Error("Ocurrió un problema en el servidor");
    }
};