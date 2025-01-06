'use client'

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";

import { formatDate, formatNumber, translateState } from "@/util";
import { cancelQuote, gettAllQuotes } from "@/actions";
import { useQuotesStore } from "@/store";
import { Quote } from "@/interfaces";

export default function PresupuestoPage() {
    const quotesList = useQuotesStore((state) => state.quotesList);
    const loadQuotesList = useQuotesStore((state) => state.loadQuotesList); 
    const router = useRouter();

    useEffect(() => {

        const resolveData = async () => {
            const quotes = await gettAllQuotes();
            loadQuotesList(quotes);
        }

        resolveData();

    },[router])

    const handleClickCancel = async (id: string) => {
        const resp = await cancelQuote(id);
        if (resp.ok) {
            const quotes = await gettAllQuotes();
            loadQuotesList(quotes);
        }
    }

    useEffect(() => {}, [quotesList]);

  	return (
    	<div className="w-full flex justify-center p-6 bg-gray-900">
      		<table className="w-11/12 border-collapse overflow-hidden rounded-lg shadow-lg bg-gray-800 text-gray-300">
        	    <thead>
                    <tr className="bg-gradient-to-r from-orange-600 via-orange-500 to-orange-400 text-white">
                        <th className="p-4 text-center border-b border-gray-700">Código</th>
                        <th className="p-4 text-center border-b border-gray-700">Estado</th>
                        <th className="p-4 text-center border-b border-gray-700">Fecha</th>
                        <th className="p-4 text-center border-b border-gray-700">Monto</th>
                        <th className="p-4 text-center border-b border-gray-700"></th>
                    </tr>
                </thead>
                <tbody>
                    {quotesList.map((quote: Quote) => (
                        <tr
                            key={quote.id}
                            className="hover:bg-gray-700 transition-all duration-300"
                        >
                            <td className="p-4 text-center">
                                <Link
                                    href={`./quotes/view/${quote.id}`}
                                    className="hover:text-blue-400 hover:underline font-semibold"
                                >
                                    {quote.slug}
                                </Link>
                            </td>
                            <td className="text-center flex flex-row gap-2 justify-center items-center p-4">
                                <span
                                    className={`inline-block w-3 h-3 rounded-full ${ quote.state }`}
                                ></span>
                                {translateState(quote.state)}
                            </td>
                            <td className="text-center">{formatDate(quote.creation_date.toString())}</td>
                            <td className="text-center font-medium">
                                ${formatNumber(quote.total_amount, 2)}
                            </td>
                            <td className="text-center p-4 max-w-[100px]">
                                <div className="flex flex-row justify-start gap-10">
                                    <Link
                                        href={`./quotes/edit/${quote.id}`}
                                        className="text-blue-400 hover:text-blue-500 font-medium"
                                    >
                                        Editar
                                    </Link>
                                    {
                                        quote.state !== 'Pending' && (
                                            <>
                                                <span></span>
                                                <span></span>
                                            </>
                                        )
                                    }
                                    {
                                        quote.state === 'Pending' && (
                                            <>
                                        
                                                <Link   
                                                    href={`./workOrder/create/${quote.id}`}
                                                    className="text-green-400 hover:text-green-500 font-medium"
                                                >
                                                        Crear Orden
                                                </Link>
                                                <button
                                                    onClick={() => handleClickCancel(quote.id)}
                                                    className="text-red-400 hover:text-red-500 font-medium"
                                                    type="button"
                                                >
                                                    Cancelar
                                                </button>
                                            </>
                                        )
                                    }
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}