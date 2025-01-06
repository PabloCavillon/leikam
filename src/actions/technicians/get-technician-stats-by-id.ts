'use server'

import prisma from "@/lib/prisma";

export const getTechniciansStatsById = async (id: string): Promise<{quantity:number, average:number}> => {

    try {
      const resp = await prisma.$queryRaw<
      { sum_of_notes: number; quantity: number }
      >`
        SELECT 
          SUM(technician_note) AS sum_of_notes, 
          COUNT(*) AS quantity
        FROM 
          technicians_work_orders
        WHERE 
          technician_id = ${id}
        GROUP BY 
          technician_id
      `;
        
      if (!resp)
        return {average:0, quantity:0}

      const stats = { 
          average: resp.sum_of_notes / resp.quantity,
          quantity: resp.quantity,
      };

      return stats;

    } catch (error) {
        console.log(error);
        return {average:0, quantity:0}
    }

}