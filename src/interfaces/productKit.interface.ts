import { Product } from "./product.interface";

export interface ProductKit {
    id: string; 
    kit_id: string; 
    product: Product; 
    quantity: number;
  }