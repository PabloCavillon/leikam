'use server'

import prisma from "@/lib/prisma";

interface Props {
    name: string, 
    slug: string,
    model: string, 
    description: string, 
    price: number, 
    current_stock: number,
    category: string,
}

export const createProduct = async (data: Props) => {
    try {
        const {id: productCreatedId} = await prisma.products.create({
            data,
            select: {
                id: true
            }
        })

        return productCreatedId;

    } catch (error) {
        console.log(error)
        throw new Error ("Ocurrió un problema al crear el producto");
    }
}

