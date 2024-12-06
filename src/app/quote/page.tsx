'use client';

import { getProductById } from "@/actions";
import { useProductStore } from "@/store";
import { useEffect, useState } from "react";
import { DetailQuote } from "./ui/DetailQuote";
import { Product } from '@/interfaces';

export default function PresupuestoPage() {
    const [productDetails, setProductDetails] = useState<Product[]>([]);
    const productsList = useProductStore(store => store.productsList); 
    const removeProductToList = useProductStore(store => store.removeProductToList);


    const reset = async () => {
        await Promise.all(
            productsList.map(item => {
                removeProductToList(item)
            })
        )
    }

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const detailsPromises = productsList.map((item) =>
                    getProductById(item.id) 
                );
                const details = await Promise.all(detailsPromises); 
                setProductDetails(details); 
            } catch (error) {
                console.error("Error al obtener los detalles de productos:", error);
            }
        };

        if (productsList.length > 0) {
            fetchProductDetails();
        } else {
            setProductDetails([]); 
        }
    }, [productsList]); 

    return(
        <>
        {
            (productDetails.length > 0) ? 
            (
                <div className="flex justify-center">
                    <DetailQuote productDetails={productDetails} reset={reset}/>
                </div>
            ) : (
                <p>Cargando productos...</p>
            )
        }
        </>
    )
    
}