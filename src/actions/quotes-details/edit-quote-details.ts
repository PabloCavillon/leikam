'use server'

import { Kit, Product } from "@/interfaces"
import prisma from "@/lib/prisma";


interface ProductWithQuantity extends Product{
    quantity: number;
}


interface KitWithQuantity extends Kit{
    quantity: number;
}

export const editQuoteDetails = async (kits: KitWithQuantity[], products: ProductWithQuantity[], quote_id: string) => {
    
    try {

        let quote_details = await prisma.quote_Details.findMany({
            where: {
                quote_id: quote_id
            }
        })
        
        
        for (const product of products) {
            const quote_detail = await prisma.quote_Details.findFirst({
                where: {
                    quote_id: quote_id, 
                    product_id: product.id 
                }
            })
            
            if (quote_detail) {
                await prisma.quote_Details.update({
                    where: {
                        id: quote_detail.id
                    },
                    data: {
                        quantity: product.quantity,
                        unit_price: product.price
                    }
                })
                quote_details = quote_details.filter(quote => quote.id !== quote_detail.id)
            } else {
                await prisma.quote_Details.create({
                    data: {
                        quote_id: quote_id,
                        product_id: product.id,
                        quantity: product.quantity,
                        unit_price: product.price
                    }
                })
            }
        }

        for (const kit of kits) {
            const quote_detail = await prisma.quote_Details.findFirst({
                where: {
                    quote_id: quote_id, 
                    kit_id: kit.id 
                }
            })
            
            if (quote_detail) {
                await prisma.quote_Details.update({
                    where: {
                        id: quote_detail.id
                    },
                    data: {
                        quantity: kit.quantity,
                        unit_price: kit.price
                    }
                })
                quote_details = quote_details.filter(quote => quote.id !== quote_detail.id)
            } else {
                await prisma.quote_Details.create({
                    data: {
                        quote_id: quote_id,
                        kit_id: kit.id,
                        quantity: kit.quantity,
                        unit_price: kit.price
                    }
                })
            }
        }

        for (const quote_detail of quote_details) {
            await prisma.quote_Details.delete({
                where: {
                    id: quote_detail.id
                }
            })
        }

        return { ok: true }
    } catch (err) {
        throw new Error(err + '')
    } 
}