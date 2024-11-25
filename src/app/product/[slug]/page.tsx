export const revalidate = 604800; //7 días

import { notFound } from "next/navigation";

import { getProductBySlug } from "@/actions/products/get-product-by-slug";
import { Metadata, ResolvingMetadata } from "next";
import { ProductForm } from "./ui/product-form";
import { Product } from "@/interfaces";

interface Props {
	params: {
		slug: string;
	}
}

export async function generateMetada (
	{params}: Props,
	parent: ResolvingMetadata
): Promise<Metadata> {
	const slug = params.slug;

	const product = await getProductBySlug(slug);

	return {
		title: product?.name ?? "Producto no encontrado",
		description: product?.description ?? "",
		openGraph: {
			title: product?.name ?? "Producto no encontrado",
			description: product?.description ?? "",
			// images: product.images
		}
	}
}


export default async function ProductPage({params}: Props){
	
	const { slug } = await params;

	const product:Product|null = await getProductBySlug(slug);

	if(!product) {
		notFound();
	}
  	
	return (
    	<div>
      		<h1>Product Page</h1>
			<ProductForm product={product} />
    	</div>
  	);
}