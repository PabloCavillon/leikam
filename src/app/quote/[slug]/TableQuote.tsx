'use client'

import Image from 'next/image'
import React, { useRef } from 'react'
import clsx from 'clsx'

import { Quote } from '@/interfaces'
import { formatDate, formatNumber } from '@/util'
import { toJpeg } from 'html-to-image'

interface Props {
    quote: Quote
}

export const TableQuote = ({quote}: Props) => {
    const tableRef = useRef<HTMLDivElement>(null)

    const filasAdicionales = [];
    if (quote.details.length < 15) {
        for (let i = 1; i <= 15 - quote.details.length ; i++) {
            filasAdicionales.push(
                <tr key={`extra-${i}`}  className={clsx({ "bg-orange-200":(i%2!==0), "bg-transparent":(i%2===0) })}>
                    <td colSpan={4} className="text-center text-gray-400 border-r-2 border-l-2 border-custom-orange">
                        <span className="text-transparent">a</span>
                    </td>
                </tr>
            );
        }
    }

	const handleExportJPG = async () => {
		if (tableRef.current) {
            try {
                const dataUrl = await toJpeg(tableRef.current, {
                    quality: 1,
                    backgroundColor: 'white',
                });

                const link = document.createElement('a');
                link.download = 'quote.jpg';
                link.href = dataUrl;
                link.click();
            } catch (error) {
                console.error('Error exporting to JPG:', error);
            }
        }
	};

    const handleCreateWorkOrder = async () => {
        alert('Esta funcion todavia no esta implementada ♥')
    }

  return (
    <div className='flex w-full justify-center items-center flex-col '>
        <div ref={tableRef} className="w-3/5 min-h-[80vh] p-5">
        <table className="w-full max-h-fit">
            <thead>
                <tr>
                    <td colSpan={4}>
                        <div className="w-full h-full flex justify-center">
                            <Image
                                src="/imgs/leikam-encabezado.svg"
                                alt="Leikam"
                                className="p-5 sm:p-0"
                                width={ 200 }
                                height={ 200 }
                                />
                        </div>
                    </td>
                </tr>
                <tr className="border-2 border-custom-orange">
                    <td className="bg-custom-orange w-3/5 text-white text-center font-bold text-2xl" rowSpan={2} colSpan={2}>
                        <span>PRESUPUESTO</span>
                    </td>
                    <td className="bg-custom-orange text-white text-right p-2 font-bold text-lg"><span>Nro:</span></td>
                    <td className="text-center"><span className="font-bold">{quote.slug}</span></td>
                </tr>
                <tr className="border-2 border-custom-orange">
                    <td className="bg-custom-orange text-white text-right p-2 font-bold text-lg">
                        <span>Fecha:</span>
                    </td>
                    <td className="flex flex-col text-center">
                        <span className="text-gray-400 text-xs">dd/mm/aaaa</span>
                        <span className="font-bold">{formatDate(quote.creation_date.toString())}</span>
                    </td>
                </tr>
                <tr className="bg-custom-orange border-2 text-center font-bold text-white">
                    <td className="border-2 border-custom-orange">Descripción</td>
                    <td className="border-2 border-custom-orange">Cantidad</td>
                    <td className="border-2 border-custom-orange">Precio /u</td>
                    <td className="border-2 border-custom-orange">Total</td>
                </tr>
            </thead>
            <tbody className="h-fit overflow-y-auto">
                {
                    quote.details.map((detail, index) => {
                        const {product} = detail
                        return (
                            <tr 
                            key={detail.id}
                            className={clsx({ "bg-orange-200":(index%2!==0), "bg-transparent":(index%2===0) })}
                            >
                                <td className="border-l-2 border-custom-orange pl-3">{product.name}</td>
                                <td className="text-center">{detail.quantity}</td>
                                <td className="text-center">$ {formatNumber(detail.unit_price * quote.dolar_value, 2)}</td>
                                <td className="border-r-2 border-custom-orange text-center">$ {formatNumber(detail.quantity * detail.unit_price * quote.dolar_value, 2)}</td>
                            </tr>
                        )   
                    })
                }
                { 
                    <tr className="bg-gray-300">
                        <td colSpan={3} className="text-left pl-3 border-l-2 border-custom-orange font-bold">Mano de Obra</td>
                        <td className="text-center border-r-2 border-custom-orange"><span>{formatNumber(quote.labor_cost, 2)}</span></td>
                    </tr>
                }                
                {filasAdicionales}    
            </tbody>
            <tfoot>
                <tr>
                    <td colSpan={3} className="bg-custom-orange text-right pr-3 pt-3 pb-3 border-l-2 border-t-2 border-custom-orange">
                        <span className="text-white font-bold text-lg">Seña:</span>
                    </td>
                    <td className="bg-transparent text-center text-lg border-r-2 border-t-2 border-custom-orange"><span>{formatNumber(quote.deposit, 2)}</span></td>
                </tr>
                <tr>
                    <td colSpan={3} className="bg-custom-orange text-right text-white font-bold text-2xl pt-4 pb-4 pr-3 border-t-2 border-l-2 border-b-2 border-custom-orange">
                        <span>TOTAL:</span>
                    </td>
                    <td className="text-center font-extrabold text-3xl border-r-2 border-b-2 border-t-2 border-custom-orange">
                        <span>$ {formatNumber(quote.total_amount, 2)}</span>
                    </td>
                </tr>
            </tfoot>
        </table>
    </div>
    <div className='flex justify-center w-full gap-5'>
        <button className='bg-custom-orange rounded p-3 text-white hover:cursor-pointer hover:bg-orange-700 transition-all duration-100 font-bold' onClick={handleExportJPG}>Descargar presupuesto</button>
        <button className='btn-disabled hover:cursor-default' onClick={handleCreateWorkOrder}>Crear Orden de trabajo</button>
    </div>
    </div>
    
  )
}