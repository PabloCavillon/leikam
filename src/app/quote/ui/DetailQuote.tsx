'use client'

import { Product } from '@/interfaces';
import { useDolarValue } from '@/store';
import { formatNumber } from '@/util';
import React, { useEffect, useState } from 'react';
import { InputEditable } from './InputEditable';

interface Props {
    productDetails: Product[];
}

export const DetailQuote = ({ productDetails }: Props) => {
    const dolarValue = useDolarValue(state => state.dolarValue);
    const updateDolarValue = useDolarValue(state => state.updateDolarValue);

    const [quantities, setQuantities] = useState<{ [id: string]: number }>({});
    const [laborCost, setLaborCost] = useState<number>(0);

    useEffect(() => {
        const initialQuantities: { [id: string]: number } = {};
        productDetails.forEach((product) => {
            initialQuantities[product.id] = 1; 
        });
        setQuantities(initialQuantities);
    }, [productDetails]);

    const handleChangeDolarValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(event.target.value);
        if (!isNaN(value)) {
            updateDolarValue(value);
        } else {
            updateDolarValue(0);
        }
    };

    const handleChangeLaborCost = (laborCostStr: string) => {
        const laborCost = parseInt(laborCostStr);
        if(!isNaN(laborCost)){
            setLaborCost(laborCost)
        }
    }

    const handleChangeQuantity = ({id} : Product, quantityStr: string) => {
        const quantity = parseInt(quantityStr, 10); 
        if (!isNaN(quantity)) {
            setQuantities((prev) => ({
                ...prev,
                [id]: quantity,
            }));
        }
    };

    const calculateTotal = (product: Product): number => {
        const quantity = quantities[product.id] || 0; 
        return product.price * quantity * dolarValue;
    };

    return (
        <div className='flex flex-col w-2/3 gap-8 pt-10'>
            <div className='flex justify-between'>
                <h2 className='text-2xl font-bold'>Armar Presupuesto</h2>
                <div>
                    <span>Valor del dolar:   </span>
                    <input 
                        type="number" 
                        onChange={handleChangeDolarValue} 
                        value={dolarValue} 
                        className='bg-custom-orange text-white font-bold text-center border-b-2'
                    />
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
                        <tr key={p.id} className='border-b-2 hover:bg-slate-300 p-5 '  >
                            <td className='w-2/5  p-5'>{p.name}</td>
                            <td className='text-center p-5 w-1/5'>
                                <div className='flex flex-col'>
                                    <span>
                                        {formatNumber(p.price * dolarValue)}
                                    </span>
                                    <span className='text-gray-400 text-sm'>
                                        (U$D {formatNumber(p.price)})
                                    </span>
                                </div>
                            </td>
                            <td className='text-center p-5 w-1/5'>
                                <div>
                                    <InputEditable 
                                        product={p} 
                                        quantities={quantities} 
                                        handleChangeQuantity={handleChangeQuantity}
                                    />
                                    <span className='text-gray-400 '>en stock: {p.currentStock}</span>
                                </div>
                            </td>
                            <td className="text-center p-5 w-1/5">{formatNumber(calculateTotal(p))}</td>
                        </tr>
                    ))}
                    <tr className='border-b-2 hover:bg-slate-300 p-5 '  >
                        <td colSpan={3} className='p-5 w-4/5'>Mano de Obra</td>
                        <td className='p-5 w-1/5 text-center'>
                            <input 
                                className='bg-transparent border-b-2 text-center w-full'
                                type="number" 
                                value={laborCost} 
                                onChange={(e) => handleChangeLaborCost(e.target.value)} 
                            />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};