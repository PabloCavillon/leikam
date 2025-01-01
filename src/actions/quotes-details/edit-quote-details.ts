'use server'

import { Product } from "@/interfaces"


interface ProductWithQuantity extends Product{
    quantity: number;
}

export const editQuoteDetails = async (products: ProductWithQuantity[], quote_id: string) => {
    // TODO: Implement this function
    return true;
}