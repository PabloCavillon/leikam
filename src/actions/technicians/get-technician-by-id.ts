'use server'

import prisma from "@/lib/prisma"

export const getTechnicianById = async ( id: string ) => {

    try {
        const technician = await prisma.technicians.findUnique({
            where: {id}
        })

        if (!technician) return null

        return technician
    
    } catch (error) {
        console.log(error)
        return null
    }

}