export interface Address {
  id: string; 
  street: string;
  number: string;
  floor?: string;
  apartment?: string;
  city: string;
  state: string;
  postalCode: string;
}