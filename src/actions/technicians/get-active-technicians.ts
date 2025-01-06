'use server'

import { Technician } from "@/interfaces"
import prisma from "@/lib/prisma"
import { getAddressById } from "../address/get-address-by-id"
import { getTechniciansStatsById } from "./get-technician-stats-by-id"

interface TechnicianData {
    id: string; 
    address_id: string; 
    first_name: string;
    last_name: string;
    phone: string;
    email?: string|null;
    skills?: string|null;
    dni: string;
    criminal_records: boolean;
    active?: boolean;
    birthday: Date;
}

export const getActiveTechnicians = async (): Promise<Technician[]|[]> => {

    try {
        const technicians = await prisma.technicians.findMany({
            where: {active: true}
        })

        const techniciansWithAddressAndStats = await Promise.all(
            technicians.map(async (tech:TechnicianData) => {
            const {address_id, ...rest} = tech;
            const technicianAddress = await getAddressById(address_id)
            const stats = await getTechniciansStatsById(tech.id)

            return {
                ...rest,
                address: technicianAddress,
                stats
            }
        }))

        return techniciansWithAddressAndStats;
    
    } catch (error) {
        console.error("Error en getTechnicianById:", error);
        return [];
    }

}