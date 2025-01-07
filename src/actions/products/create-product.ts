'use server'

import { Product } from "@/interfaces";
import prisma from "@/lib/prisma";

interface Props extends Omit<Product, 'id' | 'slug' | 'active' | 'photos_url'> {}

export const createProduct = async (data: Props) => {
    try {
        await prisma.products.create({
            data : {
                ...data,
                slug: data.name.toLowerCase().replace(/ /g, '-'),
                active: true
            },
            select: {
                id: true
            }
        })
    } catch (error) {
        console.log(error)
        throw new Error ("Ocurrió un problema al crear el producto");
    }
}

