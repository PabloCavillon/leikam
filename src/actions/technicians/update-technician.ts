'use server'

import { Technician } from "@/interfaces"
import prisma from "@/lib/prisma";

export const updateTechnician = async (technician: Technician) => {

    try {

        const technicianBD = await prisma.technicians.findFirst({where:{id:technician.id}})

        if (!technicianBD) {
            console.log("No existe el técnico para modificarlo")
            return;
        }

        const technicianUpdated = await prisma.technicians.update({
            where:{id: technician.id},
            data:{
                address_id: technician.address.id,
                ...technician
            }
        })

        return technicianUpdated;

    } catch (error) {
        console.log(error);
        throw new Error ("Ocurrió un problema la actualizar al técnico");
    }

}