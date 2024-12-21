import { Product } from "./product.interface";

export interface QuoteDetail {
    id: string;
    quote_id: string; 
    product: Product;  
    quantity: number;
    unit_price: number;
}