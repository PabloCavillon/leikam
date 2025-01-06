'use server'

import prisma from "@/lib/prisma";

interface Props {
    id:string,
    advance_payment: number, 
    dolar_value: number, 
    total_amount: number,
    labor_cost: number,
}

export const editQuote = async ({ id, advance_payment, dolar_value, total_amount, labor_cost }:Props ) => {
    try {
        await prisma.quotes.update({
            where: {id},
            data: {
                state: 'Pending',
                advance_payment,
                creation_date: new Date(),
                total_amount,
                dolar_value,
                labor_cost,
            }
        })
        
        return {ok:true}
    
    } catch (error) {
        console.log(error);
        throw new Error('Ocurrió un problema en el servidor');
    }
}