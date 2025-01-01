'use server'

import prisma from "@/lib/prisma";

interface TechnicianUpdated {
    id: string;
    first_name: string;
    last_name: string;
    phone: string;
    email: string;
    dni: string;
    criminal_records: boolean;
    birthday: Date;
}

export const updateTechnician = async (technician: TechnicianUpdated) => {

    try {
        const technicianBD = await prisma.technicians.findFirst({where:{id:technician.id}})
        if (!technicianBD) {
            console.log("No existe el técnico para modificarlo")
            return;
        }
        const {id: technicianUpdatedId} = await prisma.technicians.update({
            where:{id: technician.id},
            data:{
                ...technician
            },
            select:{
                id:true
            }
        })
        return technicianUpdatedId;
    } catch (error) {
        console.log(error);
        throw new Error ("Ocurrió un problema la actualizar al técnico" + error);
    }

}