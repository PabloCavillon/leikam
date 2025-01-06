'use server'

import { Quote } from '@/interfaces';
import prisma from '@/lib/prisma';
import { getAllDetailsByQuoteId } from '@/actions';

export const gettAllQuotes = async (): Promise<Quote[]> => {

    try {
        const quotes = await prisma.quotes.findMany({
            orderBy:{slug: 'desc'}
        })

        const quotesWithDetails = await Promise.all(
            quotes.map(async ({id, ...rest}) => {

                const details = await getAllDetailsByQuoteId(id)

                return {
                    id,
                    details, 
                    ...rest
                }
            })
        )

        return quotesWithDetails

    } catch (error) {
        console.log(error)
        throw new Error('Hubo un problema recuperando los presupuestos')
    }


}