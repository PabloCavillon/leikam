'use server'

import prisma from "@/lib/prisma";

interface TechnicianCreated {
    first_name: string;
    last_name: string;
    phone: string;
    email: string;
    dni: string;
    criminal_records: boolean;
    birthday: Date;
    address_id: string;
}
export const createTechnician = async (data:TechnicianCreated) => {

    try {
        const {id: technicianCreatedId} = await prisma.technicians.create({
            data,
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