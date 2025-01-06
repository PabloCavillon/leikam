'use server'

import prisma from "@/lib/prisma";

interface Props {
    first_name: string, 
    last_name: string,
    address_id: string,
    phone: string,
    email?: string,
}

export const createClient = async (data: Props) => {
    try {
        const {id: clientCreatedId} = await prisma.clients.create({
            data,
            select: {
                id: true
            }
        })

        return clientCreatedId;

    } catch (error) {
        console.log(error)
        throw new Error ("Ocurrió un problema al crear el producto");
    }
}

