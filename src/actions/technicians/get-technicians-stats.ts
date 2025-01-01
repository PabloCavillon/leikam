'use server'

import prisma from "@/lib/prisma";

interface TechnicianStats {
  average: number;
  quantity: number;
}

export const getTechniciansStats = async () => {

    try {
      const resp = await prisma.$queryRaw<
        { sum_of_notes: number; quantity: number; technician_id: string }[]
      >`
        SELECT 
          SUM(technician_note) AS sum_of_notes, 
          COUNT(*) AS quantity, 
          technician_id 
        FROM 
          technicians_work_orders 
        GROUP BY 
          technician_id
      `;
      
      const stats = resp.reduce<Record<string, TechnicianStats>>((acc, item) => {
        acc[item.technician_id] = {
          average: item.sum_of_notes / item.quantity,
          quantity: item.quantity,
        };
        return acc;
      }, {});

      return stats;

    } catch (error) {
        console.log(error);
        throw new Error ("ocurrio un problema al obtener los promedios")
    }

}