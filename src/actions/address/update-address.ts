'use server'

import { Address } from "@/interfaces";
import prisma from "@/lib/prisma";

export const updateAddress = async(address: Address) => {
    try {
        const {id: addressUpdated} = await prisma.addresses.update({
            where: {id: address.id},
            data: address,
            select: {
                id:true
            }
        })
        if (!addressUpdated)
            throw new Error("Ocurrio un problema al actualizar la dirección")
        return addressUpdated;
    } catch (error) {
        console.log(error);
        throw new Error("Ocurrio un problema al actualizar la dirección")
    }

}