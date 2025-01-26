import { QuoteDetail } from "@/interfaces";
import prisma from "@/lib/prisma";
import { getKitById, getProductById } from "@/actions";

interface QuoteDetailData {
    id: string;
    quote_id: string; 
    product_id: string | null;  
    kit_id: string | null;
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
                const {product_id, kit_id, ...rest} = detail;
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
        )
        return  detailsWithProduct

    } catch (error) {
        console.log(error);
        throw new Error('No se pudo recuperar los detalles del presupuesto');
    }
}