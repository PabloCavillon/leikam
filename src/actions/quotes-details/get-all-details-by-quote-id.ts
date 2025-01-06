import { QuoteDetail } from "@/interfaces";
import prisma from "@/lib/prisma";
import { getProductById } from "@/actions";

interface QuoteDetailData {
    id: string;
    quote_id: string; 
    product_id: string;  
    quantity: number;
    unit_price: number;
}

export const getAllDetailsByQuoteId = async (quoteId: string): Promise<QuoteDetail[]> => {

    try {

        const details = await prisma.quote_Details.findMany({
            where:{quote_id: quoteId}
        })

        const detailsWithProduct = await Promise.all(
            details.map(async (detail: QuoteDetailData) => {
                const {product_id, ...rest} = detail;
                const product = await getProductById(product_id);

                return {
                    product,
                    ...rest
                }
            })
        )

        return  detailsWithProduct

    } catch (error) {
        console.log(error);
        throw new Error('No se pudo recuperar los detalles del presupuesto');
    }
}