'use server'

import prisma from "@/lib/prisma";
import { Address } from "@/interfaces";

export const getAddressById = async (id:string): Promise<Address> => {

    try {
        const address = await prisma.addresses.findUnique({
            where: {id}
        })

        if (!address) 
            throw new Error(`Ocurrió un error al obtener la dirección con id:${id}`)

        return address

    }  catch (err) {
        console.log(err)
        throw new Error(`Ocurrió un error al obtener la dirección con id: ${id}`)
    }

}