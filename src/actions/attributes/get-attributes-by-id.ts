'use server'

import { Attribute } from "@/interfaces";
import prisma from "@/lib/prisma"
import { convertNullToUndefined } from "@/util";

export const getAttributeById = async (id: string): Promise<Attribute> => {
    try {
        const attributes = await prisma.attributes.findUnique({
            where: { id },
        });

        if (!attributes)
            throw new Error('Error al obtener producto por slug');
        
        return attributes
    } catch (error) {
        console.log(error);
        throw new Error('Error al obtener producto por slug');
    }
};