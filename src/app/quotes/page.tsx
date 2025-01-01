'use client'

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { Quote } from "@/interfaces";
import { useQuotesStore } from "@/store";
import { formatDate, formatNumber } from "@/util";
import { gettAllQuotes } from "@/actions";

type State = 'Pendient' | 'Accepted' | 'Canceled';

const translate = {
    'Pendient': 'Pendiente',
    'Accepted': 'Aceptado',
    'Canceled': 'Cancelado'
};


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

    },[])

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
                              href={`./quote/${quote.slug}`}
                              className="hover:text-blue-400 hover:underline font-semibold"
                          >
                              {quote.slug}
                          </Link>
                      </td>
                      <td className="text-center flex flex-row gap-2 justify-center items-center p-4">
                          <span
                              className={`inline-block w-3 h-3 rounded-full ${
                                quote.state === 'Pendient'
                                      ? 'bg-yellow-500'
                                      : quote.state === 'Accepted'
                                      ? 'bg-green-500'
                                      : quote.state === 'Canceled'
                                      ? 'bg-red-500'
                                      : 'bg-gray-400'
                              }`}
                          ></span>
                          {translate[quote.state]}
                      </td>
                      <td className="text-center">{formatDate(quote.creation_date.toString())}</td>
                      <td className="text-center font-medium">
                          ${formatNumber(quote.total_amount, 2)}
                      </td>
                      <td className="text-center p-4">
                          <div className="flex flex-row justify-around gap-2">
                             {/* <button
                                  onClick={() => handleClickEdit(quote)}
                                  className="text-blue-400 hover:text-blue-500 font-medium"
                              >
                                  Editar
                              </button>
                              <button
                                  onClick={() => handleClickCreateWorkOrder(quote.slug)}
                                  className="text-green-400 hover:text-green-500 font-medium"
                                  type="button"
                              >
                                  Crear Orden
                              </button>
                              <button
                                  onClick={() => handleClickCancel(quote.id)}
                                  className="text-red-400 hover:text-red-500 font-medium"
                                  type="button"
                              >
                                  Cancelar
                              </button>*/}
                          </div>
                      </td>
                  </tr>
              ))}
          </tbody>
      </table>
  </div>
  );
}