'use server'

import { Attribute } from "@/interfaces";
import prisma from "@/lib/prisma";

interface Props {
    name: string, 
    slug: string,
    model: string, 
    description: string, 
    price: number, 
    currentStock: number,
    category?: string,
    warrantyPeriod?: number
    attributes?: Attribute[] 
}

export const createProduct = async (params: Props) => {

    const { name, model, description, price, slug, currentStock: current_stock } = params;

    try {

        const {id, slug:slugDB} = await prisma.products.create({
            data:{
                name,
                model,
                slug,
                description,
                price,
                current_stock,
            },
            select: {
                id: true,
                slug:true
            }
        })

        return {
            ok: true,
            id,
            slug:slugDB
        }


    } catch (error) {
        console.log(error)
        throw new Error ("Ocurrió un problema al crear el producto");
    }


}

