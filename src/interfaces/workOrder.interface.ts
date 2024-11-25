import { Client } from "./client.interface";
import { TechnicianWorkOrder } from "./technicianWorkOrder.interface";

export type StatusType = 'Pending' | 'In Progress' | 'Completed' | 'Canceled';

export interface WorkOrder {
    id: string; // UUID
    client: Client; // UUID
    creationDate: Date;
    status: StatusType; 
    comments?: string;
    workNote?: number; 
    technicians: TechnicianWorkOrder[];
}

