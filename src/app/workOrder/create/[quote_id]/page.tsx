'use client';

import { getQuoteById } from "@/actions";
import { WorkOrderForm } from "@/components";
import { Quote } from "@/interfaces";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Params = Promise<{ quote_id: string }>;

export default function CreateWorkOrderPage({ params }: { params: Params }) {
    const [quote, setQuote] = useState<Quote | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const resolveParams = async () => {
            try {
                const { quote_id } = await params;
                const quote = await getQuoteById(quote_id);
                setQuote(quote);
            } catch (error) {
                console.log(error);
            }
            setIsLoading(true);
        };
        resolveParams();
    }, [params]);

    if (!isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-900 text-gray-300">
                <p className="text-lg">Cargando...</p>
            </div>
        );
    }

    if (quote === null) {
        router.push('/quotes');
        return null;
    }

    return (
        <WorkOrderForm quote={quote} />
    );
}
