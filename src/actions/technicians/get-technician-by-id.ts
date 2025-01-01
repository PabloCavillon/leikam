'use server'

import { Technician } from "@/interfaces"
import prisma from "@/lib/prisma"
import { getAddressById } from "../address/get-address-by-id"
import { getTechniciansStatsById } from "./get-technician-stats-by-id"

export const getTechnicianById = async ( id: string ): Promise<Technician|null> => {

    try {
        const technician = await prisma.technicians.findUnique({
            where: {id}
        })

        if (!technician) return null

        const {address_id, ...rest} = technician;
        const technicianAddress = await getAddressById(address_id)
        const stats = await getTechniciansStatsById(technician.id)

        if (!technicianAddress) return null

        return {
            ...rest,
            address: technicianAddress,
            stats
        }
    
    } catch (error) {
        console.error("Error en getTechnicianById:", error);
        return null;
    }

}