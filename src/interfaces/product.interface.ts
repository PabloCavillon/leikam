import { Attribute } from './attribute.interface';

export interface Product {
    id: string; 
    name: string;
    slug: string;
    model: string;
    description?: string;
    price: number;
    current_stock: number;
    active: boolean;
    category?: string | null;
    warranty_period?: number | null;
    attributes?: Attribute; 
    photos_url?: string[] | null
  }