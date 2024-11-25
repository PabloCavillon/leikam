import { Address } from "./address.interface";
import { User } from "./user.interface";

export interface Technician {
    id: string; 
    address: Address; 
    user?: User; 
    firstName: string;
    lastName: string;
    phone?: string;
    email?: string;
    skills?: string;
    dni: string;
    criminalRecords: boolean;
  }