import { ProductKit } from "./productKit.interface";

export interface Kit {
    id: string; 
    name: string;
    slug: string;
    price: number;
    description?: string;
    products: ProductKit[];
    expiration_date?: Date | null;
}