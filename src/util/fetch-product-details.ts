import { getProductById } from "@/actions";
import { Product } from "@/interfaces";

export const fetchProductsDetails = async (productList: Product[]) : Promise<Product[]> => {
    const productDetailsPromises = productList.map(async (item) => {
        const p = await getProductById(item.id);
        return p;
    })
    const details = await Promise.all(productDetailsPromises);
    return details;
}