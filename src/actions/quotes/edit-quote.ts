'use server'

import prisma from "@/lib/prisma";
import { Quote } from "@/interfaces";

type Props = Omit<Quote, 'state' | 'creation_date' | 'details' | 'slug'>

export const editQuote = async (data:Props ) => {
    try {
        await prisma.quotes.update({
            where: {id: data.id},
            data: {
                ...data,
                creation_date: new Date(),
                state: 'Pending'
            }
        })
    } catch (error) {
        console.log(error);
        throw new Error('Ocurrió un problema en el servidor');
    }
}