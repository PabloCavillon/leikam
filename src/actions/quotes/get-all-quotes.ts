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
            quotes.map(async ({id, creation_date, total_amount, labor_cost, dolar_value, ...rest}) => {

                const details = await getAllDetailsByQuoteId(id)

                return {
                    id,
                    creationDate: creation_date,
                    totalAmount: total_amount,
                    laborCost: labor_cost,
                    dolarValue: dolar_value,
                    details, 
                    ...rest
                }
            })
        )


        return quotesWithDetails

    } catch (error) {
        throw new Error('Hubo un problema recuperando los presupuestos')
    }


}