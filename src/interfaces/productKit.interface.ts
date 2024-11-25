import { Product } from "./product.interface";

export interface ProductKit {
    id: string; 
    kitId: string; 
    product: Product; 
    quantity: number;
  }