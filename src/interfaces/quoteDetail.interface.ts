import { Product } from "./product.interface";

export interface QuoteDetail {
    id: string;
    quoteId: string; 
    product: Product;  
    quantity: number;
    unitPrice: number;
}