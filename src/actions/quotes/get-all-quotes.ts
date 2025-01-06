'use server'

import { Quote, State } from '@/interfaces';
import prisma from '@/lib/prisma';
import { getAllDetailsByQuoteId } from '@/actions';

interface QuoteWithoutDetails {
    id: string; 
    creation_date: Date;
    total_amount: number;
    dolar_value: number;
    slug: string;
    labor_cost:number;
    advance_payment: number;
    state: State
}

export const gettAllQuotes = async (): Promise<Quote[]> => {

    try {
        const quotes = await prisma.quotes.findMany({
            orderBy:{slug: 'desc'}
        })

        const quotesWithDetails = await Promise.all(
            quotes.map(async (quote: QuoteWithoutDetails) => {

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