'use server'

import { Quote } from "@/interfaces"
import prisma from "@/lib/prisma"
import { getProductById } from "../products/get-product-by-id"

export const getQuoteBySlug = async (slug: string) : Promise<Quote> => {
    try {

        const quote = await prisma.quotes.findFirst({
            where:{slug}
        })

        if (!quote) {
            throw new Error ('Ocurrio un problema al buscar el presupuesto')
        }

        const quoteDetails = await prisma.quote_Details.findMany({
            where:{quote_id: quote.id}
        })

        if (!quoteDetails) {
            return {
                id: quote.id,
                creationDate: quote.creation_date,
                totalAmount: quote.total_amount,
                dolarValue: quote.dolar_value,
                slug,
                state: quote.state,
                laborCost: quote.labor_cost,
                deposit: quote.deposit,
                details: []
            }
        }

        const quoteDetailsWithProduct = await Promise.all(
            quoteDetails.map(async item => {
                const product = await getProductById(item.product_id);
                return {
                    id: item.id,
                    quoteId: item.quote_id,
                    product,
                    quantity: item.quantity,
                    unitPrice: item.unit_price
                };
            })
        );

        return {
            id: quote.id,
            creationDate: quote.creation_date,
            totalAmount: quote.total_amount,
            dolarValue: quote.dolar_value,
            slug,
            state: quote.state,
            laborCost: quote.labor_cost,
            deposit: quote.deposit,
            details: quoteDetailsWithProduct
        }

    } catch (error) {
        console.log(error)
        throw new Error ('No se pudo obtener el presupuesto por slug') 
    }
}