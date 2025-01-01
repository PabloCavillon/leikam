'use server'

import { Technician } from "@/interfaces";
import prisma from "@/lib/prisma"
import { getAddressById } from "../address/get-address-by-id";
import { getTechniciansStatsById } from "./get-technician-stats-by-id";

export const getAllTechnicians = async (): Promise<Technician[]> => {
    try {
        const technicians = await prisma.technicians.findMany();

        const techniciansComplete = await Promise.all(technicians.map(async tech => {
            const {address_id, ...rest} = tech;
            const address = await getAddressById(address_id);
            const stats = await getTechniciansStatsById(tech.id);
            return {...rest, address, stats}
        }))

        return techniciansComplete;
    } catch (error) {
        console.log(error);
        return [];
    }
};