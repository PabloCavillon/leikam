export const revalidate = 604800; // 7 días

import { notFound } from "next/navigation";

import { Metadata } from "next";
import { ProductForm } from "./ui/product-form";
import { getProductBySlug } from "@/actions";

interface Props {
  params: {
    slug: string;
  };
}

// `generateMetadata` accede a `params` de forma síncrona
export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const {slug} = await params
  const product = await getProductBySlug(slug); 

  return {
    title: product?.name ?? "Producto no encontrado",
    description: product?.description ?? "",
    openGraph: {
      title: product?.name ?? "Producto no encontrado",
      description: product?.description ?? "",
    },
  };
}

// `ProductPage` accede a `params` directamente
export default async function ProductPage({ params }: Props) {
	const {slug} = await params
  const product = await getProductBySlug(slug); // Acceso directo a `params.slug`

  if (!product) {
    notFound();
  }

  return (
    <div className="w-screen justify-items-center">
      <h1>Product Page</h1>
      <div className="w-4/5 block">
        <ProductForm product={product} />
      </div>
    </div>
  );
}
