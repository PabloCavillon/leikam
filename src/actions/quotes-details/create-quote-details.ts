'use server'
import prisma from "@/lib/prisma";
import { getProductById } from "../product/get-product-by-id";

export const createQuoteDetails = async (idQuote:string, quantities: {[id:string]: number}) => {
    
    try {
        for (const id in quantities) {

            const quantity = quantities[id];

            const product = await getProductById(id);

            await prisma.quote_Details.create({
                data:{
                    quote_id: idQuote,
                    product_id: id,
                    quantity,
                    unit_price: product.price,
                },
                select: {
                    id:true,
                    quote_id: true,
                    product_id: true,
                    quantity: true,
                    unit_price: true,
                }
            });
        }

        return {
            ok:true
        };

    } catch (error) {
        console.log(error)
        throw new Error('Ocurrio un problema en el servidor')
    }

}