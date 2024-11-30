export const revalidate = 604800; //7 días

import { notFound } from "next/navigation";

import { Metadata, ResolvingMetadata } from "next";
import { ProductForm } from "./ui/product-form";
import { Product } from "@/interfaces";
import { getProductBySlug } from "@/actions";

interface Props {
	params: {
		slug: string;
	}
}

export async function generateMetadata (
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
	
	const { slug } = params;

	const product:Product|null = await getProductBySlug(slug);

	if(!product) {
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