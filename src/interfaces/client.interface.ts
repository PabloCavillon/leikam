import { Address } from "./address.interface";
import { User } from "./user.interface";

export interface Client {
  id: string; 
  address: Address; 
  user: User; 
  firstName: string;
  lastName: string;
  phone?: string;
  email?: string;
}