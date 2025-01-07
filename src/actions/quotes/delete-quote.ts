'use server'

import prisma from "@/lib/prisma";

export const deleteQuote = async (id: string) => {
    try {
        await prisma.quotes.update({
            where:{id},
            data:{
                state: 'Canceled'
            }
        })
    } catch (error) { 
        console.log(error);
        throw new Error("Ocurrió un problema al cancelar la cotización")
    }
}