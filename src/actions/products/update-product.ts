'use server'

import prisma from "@/lib/prisma";
import { Product } from "@/interfaces";

type Props = Omit<Product, 'name' | 'slug' | 'active' | 'photos_url'>;

export const updateProduct = async(data: Props) => {

    try {

        const {id: productUpdatedId} = await prisma.products.update({
            where: {id: data.id},
            data,
            select:{
                id:true,
            }
        })

        if (!productUpdatedId)
            throw new Error("Ocurrio un problema al actualizar el producto")

        return productUpdatedId;

    } catch (error) {
        console.log(error);
        throw new Error("Ocurrio un problema al actualizar el producto")
    }

}