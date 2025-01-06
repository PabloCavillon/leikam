import { Client } from "./client.interface";
import { Quote } from "./quote.interface";
import { TechnicianWorkOrder } from "./technicianWorkOrder.interface";

export type StatusType = 'Pending' | 'In Progress' | 'Completed' | 'Canceled';

export interface WorkOrder {
    id: string; // UUID
    client: Client; 
    quote: Quote;
    creation_date: Date;
    status: StatusType; 
    comments?: string;
    work_note?: number; 
    technicians: TechnicianWorkOrder[];
}

