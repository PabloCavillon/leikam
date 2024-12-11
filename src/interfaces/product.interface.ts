import { Attribute } from './attribute.interface';

export interface Product {
    id: string; 
    name: string;
    slug: string;
    model: string;
    description?: string;
    price: number;
    currentStock: number;
    category?: string | null;
    warrantyPeriod?: number | null;
    attributes?: Attribute; 
    photosUrl?: string[] | null
  }