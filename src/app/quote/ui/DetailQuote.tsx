'use client'

import React, { useEffect, useState } from 'react';

import { InputEditableProduct } from './InputEditableProduct';
import { formatNumber } from '@/util';
import { useDolarValue } from '@/store';
import { Product, Quote } from '@/interfaces';
import { InputEditable } from '@/components';
import { createQuote, createQuoteDetails, getProductById } from '@/actions';
import Link from 'next/link';

interface Props {
    productDetails: Product[];
}

export const DetailQuote = ({ productDetails }: Props) => {
    const dolarValue = useDolarValue(state => state.dolarValue);
    const updateDolarValue = useDolarValue(state => state.updateDolarValue);

    const [quantities, setQuantities] = useState<{ [id: string]: number }>({});
    const [laborCost, setLaborCost] = useState<number>(0);
    const [deposit, setDeposit] = useState<number>(0);

    useEffect(() => {
        const initialQuantities: { [id: string]: number } = {};
        productDetails.forEach((product) => {
            initialQuantities[product.id] = 1; 
        });
        setQuantities(initialQuantities);
    }, [productDetails]);

    const handleChangeDolarValue = ({target}: React.ChangeEvent<HTMLInputElement>) => {
        let value = parseFloat(target.value);
        if (isNaN(value)) {
            value = 0;
        }
        updateDolarValue(value);
    };

    const handleChangeLaborCost = ({target}: React.ChangeEvent<HTMLInputElement>) => {
        let laborCost = parseFloat(target.value);
        if(isNaN(laborCost)){
            laborCost = 0;
        }
        setLaborCost(laborCost)
    }

    const handleChangeQuantity = ({target} : React.ChangeEvent<HTMLInputElement>, id: string) => {
        let quantity = parseInt(target.value, 10); 
        if (isNaN(quantity)) 
            quantity = 0;

        setQuantities((prev) => ({
            ...prev,
            [id]: quantity,
        }));
    };

    const calculateTotalProduct = (product: Product): number => {
        const quantity = quantities[product.id] || 0; 
        return product.price * quantity * dolarValue;
    };

    const calculateTotal =  () => {
        let total = laborCost - deposit;
        for (const id in quantities){
            const product = productDetails.filter((item) => item.id === id)[0];
            const quantity = quantities[id]
            total += product.price * dolarValue * quantity  
        }

        return total
    }

    const handleChangeDeposit = ({target}: React.ChangeEvent<HTMLInputElement>) => {
        let deposit = parseFloat(target.value); 
        if (isNaN(deposit)) 
            deposit = 0;
        setDeposit(deposit);
    }

    const handleButtonClick = async () => {
        const totalAmount = calculateTotal();
        const { id, slug } = await createQuote({ deposit, dolarValue, totalAmount, laborCost });

        if (!id) {
            alert("Hubo un problema al momento de crear el presupuesto");
            return
        }

        const resp = await createQuoteDetails(id, quantities)

        console.log(resp.ok)
        
    }

    return (
        <div className='flex flex-col w-2/3 gap-8 pt-10'>
            <div className='flex justify-between'>
                <h2 className='text-2xl font-bold'>Armar Presupuesto</h2>
                <div className='flex flex-col justify-center'>
                    <span className='text-center'>Valor del dolar</span>
                    <InputEditable value={dolarValue} handleChange={handleChangeDolarValue}/>
                </div>
            </div>
            <table>
                <thead className='bg-custom-orange text-white'>
                    <tr>
                        <th className='p-2'>Nombre</th>
                        <th className='p-2'>Precio Unitario (AR$)</th>
                        <th className='p-2'>Cantidad</th>
                        <th className='p-2'>Total (AR$)</th>
                    </tr>
                </thead>
                <tbody>
                    {productDetails.map((p) => (
                        <tr key={p.id} className='border-t-2 hover:bg-slate-300 p-5 '  >
                            <td className='p-5'>
                                <Link href={`/product/${p.slug}`}>{p.name}</Link>
                            </td>
                            <td className='text-center p-5 '>
                                <div className='flex flex-col'>
                                    <span>
                                        $ {formatNumber(p.price * dolarValue, 2)}
                                    </span>
                                    <span className='text-gray-400 text-sm'>
                                        (U$D {formatNumber(p.price, 2)})
                                    </span>
                                </div>
                            </td>
                            <td className='text-center p-5 '>
                                <div>
                                    <InputEditableProduct 
                                        id={p.id} 
                                        value={quantities[p.id] ?? 0} 
                                        handleChange={handleChangeQuantity}
                                    />
                                    <span className='text-gray-400 '>en stock: {p.currentStock}</span>
                                </div>
                            </td>
                            <td className="text-center p-5 ">
                                <span>
                                    $ {formatNumber(calculateTotalProduct(p), 2)}
                                </span>
                            </td>
                        </tr>
                    ))}
                    <tr className='border-t-4 border-custom-orange  hover:bg-slate-300 p-5 '  >
                        <td colSpan={3} className='p-5 w-4/5'>Mano de Obra</td>
                        <td className='p-5 w-1/5 text-center'>
                            <InputEditable value={laborCost} handleChange={handleChangeLaborCost}/>
                        </td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr className='bg-custom-orange'>
                        <td colSpan={2} className='p-7'>
                            <div className='flex flex-row gap-10 justify-left text-white font-bold text-lg'>
                                <span>Seña</span>
                                <InputEditable value={deposit} handleChange={handleChangeDeposit}/>
                            </div>
                        </td>
                        <td className='text-right'>
                            <span className='text-2xl text-white font-black'>Total</span>
                        </td>
                        <td className='text-center'>
                            <span className='text-2xl text-white font-black'>
                                $ {formatNumber(calculateTotal(), 2)}
                            </span>
                        </td>
                    </tr>
                </tfoot>
            </table>

            <div className='flex justify-center w-full'>
                <button 
                    onClick={handleButtonClick} 
                    className='btn-primary w-1/3 text-center'
                >
                    Crear presupuesto
                </button>
            </div>
        </div>
    );
};