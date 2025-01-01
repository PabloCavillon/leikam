'use client'

import { notFound } from "next/navigation";
import { ProductForm } from "@/components";
import { getProductBySlug } from "@/actions";
import { useEffect, useState } from "react";
import { Product } from "@/interfaces";

type Params = Promise<{slug: string}>

export default function ProductPage({params}: {params: Params}) {
  const [product, setProduct] = useState<Product>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const resolveParams = async () => {
      try{
        const {slug} = await params
        const productBD = await getProductBySlug(slug);
        if(productBD) 
          setProduct(productBD);
      } catch (err) {
        console.log("Hubo un problema al cargar el producto:", err)
      }
      setIsLoading(true)
    } 
    resolveParams();
  }, [params])
  
  if (!isLoading)
    return <p>Cargando...</p>
  
  if(!product)
    notFound();

  return (
    <div className="w-screen justify-items-center">
      <h1>Product Page</h1>
      <div className="w-4/5 block">
        <ProductForm product={product} />
      </div>
    </div>
  );
}
