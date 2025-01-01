'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

import clsx from 'clsx';
import { FaRegTrashAlt } from 'react-icons/fa';
import { CiEdit } from 'react-icons/ci';

import { useDolarValue, useProductStore} from '@/store';
import { Product, Quote } from '@/interfaces';
import { formatNumber } from '@/util';
import { createQuote } from '../../actions/quotes/create-quote';
import { useRouter } from 'next/navigation';
import { createQuoteDetails, editQuote, editQuoteDetails } from '@/actions';

type Props = {
    quote: Quote;
}

export const QuoteForm = ({quote}: Props) => {
    const productsSelected = useProductStore((store) => store.productsSelected);
    const removeProductFromSelected = useProductStore((store) => store.removeProductFromSelected);

    const updateQuantityProductSelected = useProductStore((store) => store.updateQuantityProductSelected);
    const [editQuantityProductOpen, setEditQuantityProductOpen] = useState(false);

    const dolarValue = useDolarValue((store) => store.dolarValue);
    const setDolarValue = useDolarValue((store) => store.setDolarValue);
    const [editDolarValueOpen, setEditDolarValueOpen] = useState(false);

    const [laborCost, setLaborCost] = useState(0);
    const [editLaborCostOpen, setEditLaborCostOpen] = useState(false);

    const [advancePayment, setAdvancePayment] = useState(0);
    const [editAdvancePaymentOpen, setEditAdvancePaymentOpen] = useState(false);
    
    const router = useRouter();


    useEffect(() => {
        setDolarValue(quote.dolar_value);
        setLaborCost(quote.labor_cost);
        setAdvancePayment(quote.advance_payment);
    }, [quote]);   

    useEffect(() => {}, [productsSelected])

    const calculateTotalProduct = (product: Product, quantity: number) => {
        return formatNumber(product.price * dolarValue * quantity, 2); 
    };

    const calculateTotal = () => {
        const totalProducts = productsSelected.reduce((acc, p) => {
            return acc + p.price * dolarValue * p.quantity;
        }, 0);
        
        return totalProducts + laborCost - advancePayment;
    };

    const handleDeselectProduct = (id: string) => {
        removeProductFromSelected(id);
    }

    const handlechangeQuantityProduct = (id: string, quantity: number) => {
        updateQuantityProductSelected(id, quantity);
    }   

    const handleCreateQuote = async () => {
        const quote_id = await createQuote({
            advance_payment: advancePayment, 
            dolar_value: dolarValue, 
            labor_cost: laborCost, 
            total_amount: calculateTotal()
        });

        if (!quote_id) {
            return;
        }
        const resp = await createQuoteDetails(productsSelected, quote_id);
        
        if (resp.ok) 
            router.push(`/quotes/view/${quote_id}`);
    }

    const handleUpdateQuote = async () => {
        const { ok } = await editQuote({
            id: quote.id,
            advance_payment: advancePayment, 
            dolar_value: dolarValue, 
            labor_cost: laborCost, 
            total_amount: calculateTotal()
        });

        if (!ok) return;
        
        const resp = await editQuoteDetails(productsSelected, quote.id);
        
        if (resp) 
            router.push(`/quotes/view/${quote.id}`);
    }

    return (
        <div className="flex flex-col w-full max-w-5xl bg-gray-900 rounded-lg shadow-lg p-6 space-y-8">
            <div className="flex justify-between items-center bg-gray-800 p-4 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-gray-300">Armar Presupuesto</h2>
                <div className="flex flex-col items-center text-gray-400">
                    <span className="text-sm">Valor del dólar</span>
                    <span
                        className={clsx(
                            "text-lg font-bold flex justify-center items-center gap-1 text-orange-500 hover:cursor-pointer hover:underline transition",
                            editDolarValueOpen && "hidden"
                        )}
                        onClick={() => setEditDolarValueOpen(true)}
                    >
                        $ {formatNumber(dolarValue, 2)} <CiEdit size={20}/>
                    </span>
                    <span
                        className={clsx(
                            "text-lg font-bold text-orange-500 flex items-center gap-3",
                            !editDolarValueOpen && "hidden"
                        )}
                    >
                        <input
                            type="number"
                            value={dolarValue}
                            onKeyDown={(e) => e.key === 'Enter' && setEditDolarValueOpen(false)}
                            onChange={(e) => setDolarValue(parseFloat(e.target.value))}
                            className="w-20 p-2 rounded bg-gray-700 border border-gray-600 text-gray-200 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                        />
                    </span>
                </div>
            </div>

            <table className="w-full table-auto text-gray-300">
                <thead className="bg-gradient-to-r from-orange-600 via-orange-500 to-orange-400 text-white">
                    <tr>
                        <th className="p-4 text-left text-sm font-semibold uppercase">Nombre</th>
                        <th className="p-4 text-center text-sm font-semibold uppercase">Precio Unitario (AR$)</th>
                        <th className="p-4 text-center text-sm font-semibold uppercase">Cantidad</th>
                        <th className="p-4 text-center text-sm font-semibold uppercase">Total (AR$)</th>
                    </tr>
                </thead>
                <tbody>
                    {productsSelected.map((p) => (
                        <tr
                            key={p.id}
                            className="bg-gray-800 hover:bg-gray-700 transition border-b border-gray-700"
                        >
                            <td className="p-4 pl-6 flex items-center gap-2">
                                <Link
                                    href={`/product/${p.slug}`}
                                    className="text-orange-500 hover:underline "
                                >
                                    {p.name} 
                                </Link>
                                <span onClick={() => handleDeselectProduct(p.id)}>
                                    <FaRegTrashAlt className="text-red-500 hover:cursor-pointer hover:underline transition hover:scale-125 hover:text-red-600"/>
                                </span>
                            </td>
                            <td className="p-4 text-center">
                                <div className="flex flex-col items-center">
                                    <span className="font-bold">
                                        $ {formatNumber(p.price * dolarValue, 2)}
                                    </span>
                                    <span className="text-sm text-gray-400">
                                        (U$D {formatNumber(p.price, 2)})
                                    </span>
                                </div>
                            </td>
                            <td className="p-4 text-center flex flex-col items-center">
                                <span
                                    className={clsx(
                                        "text-lg font-bold flex justify-center items-center gap-1 text-orange-500 hover:cursor-pointer hover:underline transition",
                                        editQuantityProductOpen && "hidden"
                                    )}
                                    onClick={() => setEditQuantityProductOpen(true)}
                                >
                                    {formatNumber(p.quantity, 0)} <CiEdit size={22}/>
                                </span>
                                <span
                                    className={clsx(
                                        "text-lg font-bold text-orange-500 flex items-center gap-3",
                                        !editQuantityProductOpen && "hidden"
                                    )}
                                >
                                    <input
                                        type="number"
                                        value={p.quantity}
                                        onKeyDown={(e) => e.key === 'Enter' && setEditQuantityProductOpen(false)}
                                        onChange={(e) => handlechangeQuantityProduct(p.id, Number(e.target.value))}
                                        className="w-16 text-center p-1 rounded bg-gray-700 border border-gray-600 text-gray-200 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                                    />
                                </span>
                                <span className="text-sm text-gray-400">
                                    En stock: {p.current_stock}
                                </span>
                            </td>
                            <td className="p-4 text-center">
                                <span className="font-bold">
                                    $ {calculateTotalProduct(p, p.quantity)} 
                                </span>
                            </td>
                        </tr>
                    ))}
                    <tr className="bg-gray-800 border-t-4 border-orange-500 hover:bg-gray-700 transition">
                        <td colSpan={3} className="p-4 text-left font-medium">
                            Mano de Obra 
                        </td>
                        <td className="p-4 text-center font-bold">
                            <span
                                className={clsx(
                                    "text-lg font-bold flex items-center gap-1 justify-center text-white hover:cursor-pointer hover:underline transition",
                                    editLaborCostOpen && "hidden"
                                )}
                                onClick={() => setEditLaborCostOpen(true)}
                            >
                                $ {formatNumber(laborCost,2)} <CiEdit size={20}/>
                            </span>
                            <span
                                className={clsx(
                                    "text-lg font-bold text-orange-500 flex items-center justify-center",
                                    !editLaborCostOpen && "hidden"
                                )}
                            >
                                <input
                                    type="number"
                                    value={laborCost}
                                    onKeyDown={(e) => e.key === 'Enter' && setEditLaborCostOpen(false)}
                                    onChange={(e) => setLaborCost(parseFloat(e.target.value))}
                                    className="w-24 p-2 rounded bg-gray-700 border border-gray-600 text-gray-200 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                                />
                            </span>
                        </td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr className="bg-gradient-to-r from-orange-600 via-orange-500 to-orange-400">
                        <td colSpan={2} className="p-4 text-left text-white font-semibold">
                            <div className="flex justify-start items-center gap-2">
                                <span> Seña: $ </span>
                                <span
                                    className={clsx(
                                        "text-lg font-bold flex gap-1 items-center text-white hover:cursor-pointer hover:underline transition",
                                        editAdvancePaymentOpen && "hidden"
                                    )}
                                    onClick={() => setEditAdvancePaymentOpen(true)}
                                >
                                    {formatNumber(advancePayment, 2)} <CiEdit size={22 }/>
                                </span>
                                <span
                                    className={clsx(
                                        "text-lg font-bold text-orange-500 flex items-center justify-center",
                                        !editAdvancePaymentOpen && "hidden"
                                    )}
                                >
                                    <input
                                        type="number"
                                        value={advancePayment}
                                        onKeyDown={(e) => e.key === 'Enter' && setEditAdvancePaymentOpen(false)}
                                        onChange={(e) => setAdvancePayment(parseFloat(e.target.value))}
                                        className="w-24 p-2 rounded bg-gray-700 border border-gray-600 text-gray-200 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                                    />
                                </span>
                            </div>
                        </td>
                        <td className="p-4 text-right text-white text-lg font-bold">Total:</td>
                        <td className="p-4 text-center text-white text-2xl font-black">
                            $ {formatNumber(calculateTotal(), 2)}
                        </td>
                    </tr>
                </tfoot>
            </table>
            <div className="flex justify-center">
                { quote && (
                    <button
                        onClick={handleUpdateQuote}
                        className="bg-orange-600 text-gray-900 px-6 py-2 rounded-lg text-lg font-semibold hover:bg-orange-500 transition"
                    >
                        Actualizar presupuesto
                    </button>
                )}
                { !quote && (
                    <button
                        onClick={handleCreateQuote}
                        className="bg-orange-600 text-gray-900 px-6 py-2 rounded-lg text-lg font-semibold hover:bg-orange-500 transition"
                    >
                        Crear presupuesto
                    </button>
    
                )}
            </div>
        </div>
    );
};
