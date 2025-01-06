import { ProductKit } from "./productKit.interface";

export interface Kit {
    id: string; 
    name: string;
    slug: string;
    price: number;
    products: ProductKit[];
    expiration_date?: Date | null;
}