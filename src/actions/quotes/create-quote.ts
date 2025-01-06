'use server'

import prisma from "@/lib/prisma";

interface Props {
    advance_payment: number, 
    dolar_value: number, 
    total_amount: number,
    labor_cost: number,
}

export const createQuote = async ({ advance_payment, dolar_value, total_amount, labor_cost }:Props ) => {
    const slug = await generateNextSlug();
    
    try {
        const { id } = await prisma.quotes.create({
          data: {
            advance_payment,
            creation_date: new Date(),
            total_amount,
            dolar_value,
            labor_cost,
            slug,
          },
          select: {
            id: true
          }
        })
        
        return id
    
    } catch (error) {
        console.log(error);
        throw new Error(`Ocurrió un problema en el servidor: ${error}`);
    }
}

const generateNextSlug = async () => {
    const code = await getLastQuoteSlug();

    const [prefix, numberPart] = code.split('-');
  
    const incrementedNumber = String(parseInt(numberPart, 10) + 1).padStart(numberPart.length, '0');
  
    return `${prefix}-${incrementedNumber}`;
}

const getLastQuoteSlug = async () => {
    const lastQuote = await prisma.quotes.findFirst({
      orderBy: {
        creation_date: 'desc', // Ordena por la fecha de creación en orden descendente
      },
    });
    
    if (!lastQuote)
        return 'Q-00001'; // Si no hay registros, retorna el primer código

    // Retorna solo la columna específica si el registro existe
    return lastQuote['slug'];
}