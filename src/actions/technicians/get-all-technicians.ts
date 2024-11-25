'use server'

import prisma from "@/lib/prisma"


export const getAllTechnicians = async() => {
    try {
        const technicians = await prisma.technicians.findMany();

        return technicians;
    
    } catch (error) {
        console.log(error)
        return null;
    }
}