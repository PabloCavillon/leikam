'use server'

import { Quote } from "@/interfaces";
import prisma from "@/lib/prisma";
import { getAllDetailsByQuoteId } from '../quotes-details/get-all-details-by-quote-id';



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