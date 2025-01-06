'use server'

import { Kit } from "@/interfaces";
import prisma from "@/lib/prisma";
import { getAllProductKits } from "../product-kit/get-product-kit-by-id";

interface KitWithoutProducts {
    id: string; 
    name: string;
    slug: string;
    price: number;
    expiration_date?: Date | null;
}

export const getAllKits = async () : Promise<Kit[]> => {
    try {
        const kits = await prisma.kits.findMany();
        
        const kitsUpdated = Promise.all(kits.map(async (kit: KitWithoutProducts) => {
            const productsKits = await getAllProductKits(kit.id);

            return { ...kit, products: productsKits }
        }))

        return kitsUpdated; 

    } catch (error) {
        console.log(error)
        throw new Error('Error al obtener los kits');
    }
}