'use server'

import prisma from "@/lib/prisma";



export const cancelQuote = async (id: string) => {

    await prisma.quotes.update({
        where:{id},
        data:{
            state: 'Canceled'
        }
    })

    return {
        ok: true
    };

}