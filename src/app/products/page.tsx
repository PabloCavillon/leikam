import { getAllProducts } from "@/actions";
import { TableProducts } from "./ui/TableProducts";

export default async function ProductsPage() {
    
    const products = await getAllProducts();
  
    return (
        <div>
            <TableProducts products={products}/>
        </div>
    );
}