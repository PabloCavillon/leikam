'use server'

import prisma from "@/lib/prisma";

interface AddressUpdated {
    id: string;
    street: string;
    number: string;
    floor: string;
    apartment: string;
    city: string;
    state: string;
    postal_code: string;
    additional_comment: string;
}

export const updateAddress = async(address: AddressUpdated) => {

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