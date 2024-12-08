import { notFound } from "next/navigation";
import { ProductForm } from "./ui/product-form";
import { getProductBySlug } from "@/actions";

type Params = Promise<{slug: string}>

export default async function ProductPage({params}: {params: Params}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

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
