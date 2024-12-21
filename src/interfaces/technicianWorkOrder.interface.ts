import { Technician } from "./technician.interface";

export interface TechnicianWorkOrder {
    id: string; // UUID
    work_order_id: string; // UUID
    technician: Technician; // UUID
    client_note: number; // 1 to 5
}