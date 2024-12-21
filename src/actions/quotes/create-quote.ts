'use server'

import prisma from "@/lib/prisma";

interface Props {
    deposit: number, 
    dolar_value: number, 
    total_amount: number,
    labor_cost: number,
}

export const createQuote = async ({ deposit, dolar_value, total_amount, labor_cost }:Props ) => {
    const slug = await generateNextSlug();
    
    try {
        const {id, slug:slugDB} = await prisma.quotes.create({
          data: {
            deposit,
            creation_date: new Date(),
            total_amount,
            dolar_value,
            labor_cost,
            slug
        },
          select: {
            id: true, 
            slug:true
          }
        })
        
        return {
            ok: true,
            id,
            slug:slugDB
        }
    
    } catch (error) {
        console.log(error);
    
        return {
            ok: false,
            message: 'No se pudo crear el presupuesto'
        }
    }
}

const generateNextSlug = async () => {
    const code = await getLastQuoteSlug();

    // Divide el código en la parte fija y la numérica
    const [prefix, numberPart] = code.split('-');
  
    // Incrementa la parte numérica y agrega ceros para mantener el formato
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
        throw new Error('Ocurrió un problema en el servidor')

    // Retorna solo la columna específica si el registro existe
    return lastQuote['slug'];
}