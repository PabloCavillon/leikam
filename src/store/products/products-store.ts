import { Product } from "@/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
    productsList: Product[];

    getSummaryInformation: () => {
        cantProducts:number,
        total:number,
        subTotal:number,
    }

    addProductToList: (product: Product) => void;
    removeProductToList: (product: Product) => void;
    verifyProductInList: (product:Product) => boolean;
}

export const useProductStore = create<State> () (
    persist(
        (set, get) => ({
            productsList: [],

            getSummaryInformation : () => {
                return {cantProducts:3,total:2,subTotal:1}
            },

            addProductToList: (product:Product) => {
                const {productsList} = get();

                const productInList = productsList.some(
                    (item) => item.id === product.id
                )

                if(!productInList)
                    set({productsList:[...productsList, product]})

            },  

            removeProductToList: (product: Product) => {
                const {productsList} = get();
                const producctListUpdated = productsList.filter (
                    (item) => item.id !== product.id
                )                
                set({productsList: producctListUpdated})
            },

            verifyProductInList: (product:Product) => {
                const {productsList} = get();
                const productFound = productsList.find(item => item.id === product.id);
                if (!productFound) 
                    return false
                return true
            },
        }),
        {
            name: "products-selected"
        }
    )
)