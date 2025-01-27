'use client'

import { useEffect, useState } from "react";
import { Quote } from "@/interfaces";
import { getQuoteById } from "@/actions";
import { useRouter } from "next/navigation";
import { QuoteForm } from "@/components";

type Params = Promise<{id: string}>

export default function QuoteBySlugPage({params} : {params: Params}) {

    const [quote, setQuote] = useState<Quote | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {

        const fetchQuote = async () => {
            try {
                const {id} = await params;
                const resp = await getQuoteById(id);
                setQuote(resp);            
            } catch (error) {
                console.log("Error al obtener el presupuesto", error);
                alert("Error al obtener el presupuesto");
                router.push("/quotes");
            };
            setIsLoading(true);
        }
        fetchQuote();
    }, [router])

    if (!isLoading) {
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
        <div className="flex w-full justify-center">
            <QuoteForm quote={quote} />
        </div>
    );
}