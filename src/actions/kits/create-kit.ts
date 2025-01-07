'use server'

import { Kit, Product } from "@/interfaces";
import prisma from "@/lib/prisma";
import { createProductKit } from "../product-kit/create-product-kit";

interface ProductWithQuantity extends Product {
    quantity: number;
}

interface KitWithoutIdAndSlug extends Omit<Kit, "id" | "slug" | "products"> {
    products: ProductWithQuantity[];
}

export const createKit = async (data: KitWithoutIdAndSlug) => {
    try {
        const {id: kitCreatedId} = await prisma.kits.create({
            data: {
                name: data.name,
                slug: data.name.toLowerCase().replace(/ /g, "-"),
                price: Number(data.price),
                expiration_date: data.expiration_date ? new Date(data.expiration_date) : null,
            },
            select: {
                id: true
            }
        })

        await Promise.all(data.products.map(async (product:ProductWithQuantity) => {
            await createProductKit({product, kit_id: kitCreatedId, quantity: product.quantity});
        }))

        return {ok:true};

    } catch (error) {
        console.log(error)
        throw new Error ("Ocurrió un problema al crear el kit");
    }
}

