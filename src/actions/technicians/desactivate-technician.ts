'use server'

import prisma from "@/lib/prisma";
import { getAddressById } from "../address/get-address-by-id";

export const desactivateTechnician = async (id: string) => {

    try {
        const technicianBD = await prisma.technicians.findFirst({where:{id}})
        if (!technicianBD) {
            throw new Error("El técnico no existe");
        }
        const technicianUpdated = await prisma.technicians.update({
            where:{id},
            data:{
                active: false
            }
        })
        const {address_id, ...rest} = technicianUpdated;
        const address = await getAddressById(technicianBD.address_id);
        return {...rest, address};
    } catch (error) {
        console.log(error);
        throw new Error ("Ocurrió un problema la actualizar al técnico" + error);
    }

}