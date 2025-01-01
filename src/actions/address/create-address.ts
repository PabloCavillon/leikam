'use server'

import { Technician } from "@/interfaces"
import prisma from "@/lib/prisma";

interface AddressCreated {
    street: string;
    number: string;
    floor: string;
    apartment: string;
    city: string;
    state: string;
    postal_code: string;
    additional_comment: string;
}

export const createAddress = async (address:AddressCreated) => {

    try {

        const {id: addressCreatedId} = await prisma.addresses.create({
            data: {
                ...address
            },
            select: {
                id:true
            }
        })

        return addressCreatedId;

    } catch (error) {
        console.log(error);
        throw new Error ('Hubo un problema al crear la dirección');
    }

}