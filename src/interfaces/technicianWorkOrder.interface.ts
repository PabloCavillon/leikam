import { Technician } from "./technician.interface";

export interface TechnicianWorkOrder {
    id: string; // UUID
    workOrderId: string; // UUID
    technician: Technician; // UUID
    clientNote: number; // 1 to 5
}