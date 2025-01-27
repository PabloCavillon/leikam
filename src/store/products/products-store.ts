import { Product, QuoteDetail } from "@/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ProductWithQuantity extends Product {
    quantity: number;
}

interface State {
    productsList: Product[];
    productsSelected: ProductWithQuantity[];

    getSummaryInformation: () => {
        cantProducts:number,
        total:number,
        subTotal:number,
    }

    loadProductsList: (products: Product[]) => void;
    addProductToList: (product: Product) => void;
    removeProductToList: (id: string) => void;
    
    loadProductsSelected: (quoteDetail:QuoteDetail[]) => void;
    verifyProductIsSelected: (id: string) => boolean;
    addProductToSelected: (product: Product, quantity?: number) => void;
    removeProductFromSelected: (id: string) => void;
    updateQuantityProductSelected: (id: string, quantity: number) => void;
    emptyProductsSelected: () => void;
}

export const useProductStore = create<State> () (
    persist(
        (set, get) => ({
            productsList: [],
            productsSelected: [],

            getSummaryInformation : () => {
                return {cantProducts:3,total:2,subTotal:1}
            },

            loadProductsList: (products:Product[]) => {
                set({productsList:products})
            },

            addProductToList: (product:Product) => {
                const {productsList} = get();

                const productInList = productsList.some(
                    (item) => item.id === product.id
                )

                if(!productInList)
                    set({productsList:[...productsList, product]})

            },  

            removeProductToList: (id: string) => {
                const {productsList} = get();
                const producctListUpdated = productsList.filter (
                    (item) => item.id !== id
                )                
                set({productsList: producctListUpdated})
            },

            verifyProductIsSelected: (id: string) => {
                const { productsSelected } = get(); // Verificar en productsSelected
                const productFound = productsSelected.some((item) => item.id === id);
                return productFound;
            },

            loadProductsSelected: (quoteDetail:QuoteDetail[]) => {
                const products = quoteDetail
                .map((item) => {
                    if (item.product !== null) {
                        return { ...item.product, quantity: item.quantity };
                    }
                    return undefined; // Aseguramos que el mapa devuelva un valor explícito
                })
                .filter((product): product is ProductWithQuantity => product !== undefined); // Filtramos los valores undefined
        
                set({ productsSelected: products });
            },

            addProductToSelected: (product: Product, quantity: number = 1) => {
                const {productsSelected} = get();
                const productInList = productsSelected.some(
                    t => t.id === product.id
                )
                if(!productInList)
                    set({productsSelected:[...productsSelected, {...product, quantity}]})
            },

            removeProductFromSelected: (id: string) => {
                const {productsSelected} = get();
                const productsSelectedUpdated = productsSelected.filter(
                    (item) => item.id !== id
                )
                set({productsSelected:productsSelectedUpdated})
            },

            updateQuantityProductSelected: (id: string, quantity: number) => {
                const {productsSelected} = get();
                const productsSelectedUpdated = productsSelected.map(
                    (item) => {
                        if(item.id === id)
                            return {...item, quantity}
                        return item;
                    }
                )
                set({productsSelected:productsSelectedUpdated})
            },

            emptyProductsSelected: () => {
                set({productsSelected:[]});
            }

        }),
        {
            name: "products-store"
        }
    )
)