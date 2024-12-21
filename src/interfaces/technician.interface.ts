import { Address } from "./address.interface";
import { User } from "./user.interface";

export interface Technician {
    id: string; 
    address: Address; 
    user?: User; 
    first_name: string;
    last_name: string;
    phone?: string;
    email?: string;
    skills?: string;
    dni: string;
    criminal_records: boolean;
  }