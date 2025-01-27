'use server'

import { Quote } from '@/interfaces';
import prisma from '@/lib/prisma';
import { getAllDetailsByQuoteId } from '@/actions';

type Props = Omit<Quote, 'details'>;

export const gettAllQuotes = async (): Promise<Quote[]> => {

    try {
        const quotes = await prisma.quotes.findMany({
            orderBy:{slug: 'desc'}
        })

        const quotesWithDetails = await Promise.all(
            quotes.map(async (quote: Props) => {

                const {id, ...rest} = quote;

                const details = await getAllDetailsByQuoteId(id)

                return {
                    ...rest,
                    id,
                    details, 
                }
            })
        )

        return quotesWithDetails

    } catch (error) {
        console.log(error)
        throw new Error('Hubo un problema recuperando los presupuestos')
    }


}