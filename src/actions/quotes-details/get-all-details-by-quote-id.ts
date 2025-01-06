import { QuoteDetail } from "@/interfaces";
import prisma from "@/lib/prisma";
import { getProductById } from "@/actions";




export const getAllDetailsByQuoteId = async (quoteId: string): Promise<QuoteDetail[]> => {

    try {

        const details = await prisma.quote_Details.findMany({
            where:{quote_id: quoteId}
        })

        const detailsWithProduct = await Promise.all(
            details.map(async ({product_id, ...rest}) => {

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