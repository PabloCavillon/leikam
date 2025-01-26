'use server'

import { Quote } from "@/interfaces"
import prisma from "@/lib/prisma"
import { getProductById } from "../products/get-product-by-id"
import { getKitById } from "../kits/get-kit-by-id";

export interface QuoteDetail {
    id: string;
    quote_id: string; 
    product_id: string | null;
    kit_id: string | null;  
    quantity: number;
    unit_price: number;
}

export const getQuoteById = async (id: string) : Promise<Quote> => {
    try {

        const quote = await prisma.quotes.findFirst({
            where:{ id }
        })

        if (!quote) {
            throw new Error ('Ocurrio un problema al buscar el presupuesto')
        }

        const quoteDetails = await prisma.quote_Details.findMany({
            where:{quote_id: id}
        })

        if (!quoteDetails) {
            return {
                ...quote,
                details: []
            }
        }

        const quoteDetailsWithProduct = await Promise.all(
            quoteDetails.map(async (qd: QuoteDetail) => {
                
                const {product_id, kit_id, ...rest} = qd;

                if (product_id) {
                    const product = await getProductById(product_id);
                    return {
                        product,
                        kit: null,
                        ...rest
                    }
                }
                if (kit_id !== null) {
                    const kit = await getKitById(kit_id);
                    return {
                        kit,
                        product: null,
                        ...rest
                    }
                }
                return {
                    product: null,
                    kit: null,
                    ...rest
                }
            })
        );

        return {
            ...quote,
            details: quoteDetailsWithProduct
        }

    } catch (error) {
        console.log(error)
        throw new Error ('No se pudo obtener el presupuesto por slug') 
    }
}