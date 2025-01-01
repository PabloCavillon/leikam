export interface Address {
  id: string; 
  street: string;
  number: string;
  floor?: string | null;
  apartment?: string | null;
  city: string;
  state: string;
  postal_code: string;
  additional_comment?: string | null;
}