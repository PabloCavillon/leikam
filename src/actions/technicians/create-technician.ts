'use server'

import { Technician } from "@/interfaces"
import prisma from "@/lib/prisma";

export const createTechnician = async (technician: Technician) => {

    try {

        const technicianCreatedId = await prisma.technicians.create({
            data: {
                address_id: technician.address.id,
                ...technician
            },
            select: {
                id:true
            }
        })

        return technicianCreatedId;

    } catch (error) {
        console.log(error);
        throw new Error ('Hubo un problema al crear el tecnico')
    }

}