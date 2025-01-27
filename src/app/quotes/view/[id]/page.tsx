'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toJpeg, toPng } from "html-to-image";
import { saveAs } from 'file-saver';

import { formatDate, formatNumber } from '@/util';
import { getQuoteById } from "@/actions";
import { Quote } from "@/interfaces";
import { LuDownload } from "react-icons/lu";
import { CiEdit } from "react-icons/ci";
import { LuCopy } from "react-icons/lu";

type Params = Promise<{ id: string }>;

export default function ViewQuotePage({ params }: { params: Params }) {
    const [quote, setQuote] = useState<Quote | null>(null);
    const [isloading, setIsLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const fetchQuote = async () => {
            try {
                const { id } = await params;
                const resp = await getQuoteById(id);
                setQuote(resp);
            } catch (error) {
                alert("Error al obtener el presupuesto");
                console.log("Error al obtener el presupuesto", error);
                router.push("/quotes");
            }
            setIsLoading(true);
        };
        fetchQuote();
    }, [params, router]);

    const handleDownload = async () => {
        const tableElement = document.getElementById('table-to-download');
        if (!tableElement) return;

        try {
            const dataUrl = await toJpeg(tableElement, { quality: 0.95 });
            saveAs(dataUrl, `Presupuesto-${quote?.slug}.jpg`);
        } catch (error) {
            console.error('Error al exportar la tabla:', error);
        }
    };

    const handleCopy = async () => {
        const tableElement = document.getElementById('table-to-download');
        if (!tableElement) return;
    
        try {
            // Generar la imagen en formato PNG
            const dataUrl = await toPng(tableElement, { quality: 1.0 });
            const blob = await (await fetch(dataUrl)).blob();
    
            // Verificar si el navegador soporta ClipboardItem
            if (!navigator.clipboard || !window.ClipboardItem) {
                alert("La funcionalidad de copiar al portapapeles no es soportada en este navegador.");
                return;
            }
    
            // Crear el objeto ClipboardItem con el tipo MIME correcto
            const clipboardItem = new ClipboardItem({ "image/png": blob });
    
            // Copiar la imagen al portapapeles
            await navigator.clipboard.write([clipboardItem]);
    
            alert("Imagen copiada al portapapeles con éxito.");
        } catch (error) {
            console.error('Error copiando la imagen:', error);
            alert("Error al copiar la imagen. Por favor, verifica los permisos del navegador.");
        }
    };

    if (!isloading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="loader"></div>
            </div>
        );
    }

    if (!quote) {
        return (
            <div className="flex justify-center items-center h-screen">
                <h2 className="text-2xl font-bold text-gray-300">Presupuesto no encontrado</h2>
            </div>
        );
    }

    return (
        <div className="flex justify-center items-center pt-10">
            <div className="flex flex-col w-full max-w-5xl bg-gray-900 rounded-lg shadow-lg p-6 space-y-8">
                <div id="table-to-download">
                    <div className="flex justify-between items-center bg-gray-800 p-4 rounded-lg shadow-md">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-300">Presupuesto {quote.slug}</h2>
                        </div>
                        <div className="flex flex-col items-center text-gray-400">
                            <span className="text-md">Fecha:</span>
                            <span className="text-lg font-bold flex justify-center items-center gap-1 text-orange-500">
                                {formatDate(quote.creation_date.toString())}
                            </span>
                        </div>
                    </div>

                    <table className="w-full table-auto text-gray-300">
                        <thead className="bg-gradient-to-r from-orange-600 via-orange-500 to-orange-400 text-white">
                            <tr>
                                <th className="p-4 text-left text-sm font-semibold uppercase">Producto</th>
                                <th className="p-4 text-center text-sm font-semibold uppercase">Precio Unitario (AR$)</th>
                                <th className="p-4 text-center text-sm font-semibold uppercase">Cantidad</th>
                                <th className="p-4 text-center text-sm font-semibold uppercase">Total (AR$)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {quote.details.map((qd) => (
                                <tr
                                    key={qd.id}
                                    className="bg-gray-800 hover:bg-gray-700 transition border-b border-gray-700"
                                >
                                    <td className="p-4 pl-6 flex items-center gap-2">
                                        {(qd.product !== null) && (
                                            <Link
                                                href={`/product/${qd.product.slug}`}
                                                className="text-orange-500 hover:underline transition"
                                            >
                                                {qd.product.name}
                                            </Link>
                                        )}
                                        {(qd.kit !== null) && (
                                            <div>
                                                <Link
                                                    href={`/kits/${qd.kit.id}`}
                                                    className="text-orange-500 hover:underline transition"
                                                    >
                                                    {qd.kit.name.toUpperCase()}
                                                </Link>
                                                <ul>
                                                    {qd.kit.products.map((product) => (
                                                        <li key={product.id} className="text-sm text-gray-400">
                                                            {product.quantity} x {product.product.name}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </td>
                                    <td className="p-4 text-center">
                                        <div className="flex flex-col items-center">
                                            <span className="font-bold">
                                            {qd.kit && ( <>$ {formatNumber(qd.unit_price, 2)}</>)}
                                            {qd.product && ( <>$ {formatNumber(qd.unit_price * quote.dolar_value, 2)}</>)}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="p-4 text-center flex flex-col items-center">
                                        <span
                                            className="text-lg font-bold flex justify-center items-center gap-1 text-orange-500"
                                        >
                                            {qd.quantity}
                                        </span>
                                    </td>
                                    <td className="p-4 text-center">
                                        <span className="font-bold">
                                            {qd.kit && ( <>$ {formatNumber(qd.unit_price * qd.quantity, 2)}</>)}
                                            {qd.product && ( <>$ {formatNumber(qd.unit_price * quote.dolar_value * qd.quantity, 2)}</>)}
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
                                        className="text-lg font-bold flex items-center gap-1 justify-center text-white"
                                    >
                                        $ {formatNumber(quote.labor_cost, 2)}
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
                                            className="text-lg font-bold flex gap-1 items-center text-white"
                                        >
                                            {formatNumber(quote.advance_payment, 2)}
                                        </span>
                                    </div>
                                </td>
                                <td className="p-4 text-right text-white text-lg font-bold">Total:</td>
                                <td className="p-4 text-center text-white text-2xl font-black">
                                    $ {formatNumber(quote.total_amount, 2)}
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>

                <div className="flex justify-center gap-3">
                    <button
                        onClick={() => router.push(`/quotes/edit/${quote.id}`)}
                        className="bg-orange-600 text-gray-900 px-6 py-2 rounded-lg text-lg font-semibold hover:bg-orange-500 transition flex items-center gap-2"
                    >
                        <span>Editar</span>
                        <CiEdit />
                    </button>
                    <button
                        onClick={handleDownload}
                        className="bg-orange-600 text-gray-900 px-6 py-2 rounded-lg text-lg font-semibold hover:bg-orange-500 transition flex items-center gap-2"
                    >
                        <span>Descargar</span>
                        <LuDownload />
                    </button>
                    <button
                        onClick={handleCopy}
                        className="bg-orange-600 text-gray-900 px-6 py-2 rounded-lg text-lg font-semibold hover:bg-orange-500 transition flex items-center gap-2"
                    >
                        <span>Copiar</span>
                        <LuCopy />
                    </button>
                </div>
            </div>
        </div>
    );
}
