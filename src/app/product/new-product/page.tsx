import { createProduct } from "@/actions";
import { ProductForm } from "./ProductForm";
import { redirect } from "next/navigation";

export default function NewProductPage() {
    
    return (
        <div>
            <ProductForm />
        </div>
    );
}