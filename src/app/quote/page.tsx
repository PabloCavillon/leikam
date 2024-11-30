'use client';

import { getProductById } from "@/actions";
import { useProductStore } from "@/store";
import { useEffect, useState } from "react";
import { DetailQuote } from "./ui/DetailQuote";
import { Product } from "@/interfaces";

export default function PresupuestoPage() {
    const [productDetails, setProductDetails] = useState<Product[]>([]); // Estado local
    const productsList = useProductStore(store => store.productsList); // IDs seleccionados

    // Efecto para obtener detalles de los productos
    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const detailsPromises = productsList.map((item) =>
                    getProductById(item.id) // Llama directamente sin async en map
                );
                const details = await Promise.all(detailsPromises); // Espera todas las promesas
                setProductDetails(details); // Actualiza el estado
            } catch (error) {
                console.error("Error al obtener los detalles de productos:", error);
            }
        };

        if (productsList.length > 0) {
            fetchProductDetails(); // Ejecuta si hay productos seleccionados
        } else {
            setProductDetails([]); // Limpia si no hay productos
        }
    }, [productsList]); // Efecto depende de los IDs seleccionados

    return(
        <>
        {
            (productDetails.length > 0) ? 
            (
                <div className="flex justify-center">
                    <DetailQuote productDetails={productDetails} />
                </div>
            ) : (
                <p>Cargando productos...</p>
            )
        }
        </>
    )
    
}