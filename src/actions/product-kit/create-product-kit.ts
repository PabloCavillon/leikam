'use server'

import prisma from "@/lib/prisma";
import { ProductKit } from "@/interfaces";

interface ProductKitWithoutId extends Omit<ProductKit, "id"> {}

export const createProductKit = async (data: ProductKitWithoutId) => {

    try {

        await prisma.products_Kits.create({
            data: {
                product_id: data.product.id,
                kit_id: data.kit_id,
                quantity: data.quantity
            }
        })

        return {ok:true};

    } catch (error) {

        console.log(error)
        throw new Error ("Ocurrió un problema al crear el producto del kit");

    }

}