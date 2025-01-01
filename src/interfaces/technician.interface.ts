import { Address } from "./address.interface";
import { User } from "./user.interface";

export interface Technician {
    id: string; 
    address: Address; 
    user?: User|null; 
    first_name: string;
    last_name: string;
    phone?: string|null;
    email?: string|null;
    skills?: string|null;
    dni: string;
    criminal_records: boolean;
    active?: boolean;
    birthday: Date | null;
    stats?: {
      average: number,
      quantity: number
    };
}