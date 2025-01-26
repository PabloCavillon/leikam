'use server'

import prisma from "@/lib/prisma"

import { Kit } from "@/interfaces"
import { getAllProductKits } from "../product-kit/get-product-kit-by-id";

export const getKitById = async (id: string) : Promise<Kit> => {
    try {

        const kit = await prisma.kits.findFirst({
            where:{ id }
        })

        if (!kit) {
            throw new Error ('Ocurrio un problema al buscar el kit')
        }

        const kitProducts = await prisma.products_Kits.findMany({
            where:{kit_id: kit.id}
        })

        if (!kitProducts) {
            return {
                ...kit,
                products: []
            }
        }

       const productsKits = await getAllProductKits(kit.id);
       
        return { ...kit, products: productsKits }

    } catch (error) {
        console.log(error)
        throw new Error ('No se pudo obtener el presupuesto por slug') 
    }
}