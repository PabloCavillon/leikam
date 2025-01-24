'use server'

import { Address } from "@/interfaces";
import prisma from "@/lib/prisma";

type Props = Omit<Address, 'id'>

export const createAddress = async (address:Props) => {
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