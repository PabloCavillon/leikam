import { Kit } from "./kit.interface";
import { Product } from "./product.interface";

export interface QuoteDetail {
    id: string;
    quote_id: string; 
    product: Product | null;
    kit: Kit | null;  
    quantity: number;
    unit_price: number;
}