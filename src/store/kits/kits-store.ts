import { Kit, QuoteDetail } from "@/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface KitWithQuantity extends Kit {
    quantity: number;
}

interface State {
    kitsList: Kit[];
    kitsSelected: KitWithQuantity[];

    loadKitsList: (kits: Kit[]) => void;
    
    verifyKitIsSelected: (id: string) => boolean;
    loadKitsSelected: (quoteDetail:QuoteDetail[]) => void;
    addKitToSelected: (kit: Kit, quantity?: number) => void;
    removeKitFromSelected: (id: string) => void;
    updateQuantityKitSelected: (id: string, quantity: number) => void;
    emptyKitsSelected: () => void;
}

export const useKitsStore = create<State> () (
    persist(
        (set, get) => ({
            kitsList: [],
            kitsSelected: [],

            loadKitsList: (kits:Kit[]) => {
                set({kitsList:kits})
            },

            verifyKitIsSelected: (id: string) => {
                const {kitsSelected} = get();
                return kitsSelected.some(
                    (item) => item.id === id
                )
            },
            loadKitsSelected: (quoteDetail:QuoteDetail[]) => {
                const kits = quoteDetail
                    .map((item) => {
                        if (item.kit !== null) {
                            return { ...item.kit, quantity: item.quantity };
                        }
                        return undefined; // Aseguramos que el mapa devuelva un valor explícito
                    })
                    .filter((kit): kit is KitWithQuantity => kit !== undefined); // Filtramos los valores undefined
                
                set({ kitsSelected: kits });
            },

            addKitToSelected: (kit: Kit, quantity: number = 1) => {
                const {kitsSelected} = get();
                const kitInList = kitsSelected.some(
                    (item) => item.id === kit.id
                )
                if(!kitInList)
                    set({kitsSelected:[...kitsSelected, {...kit, quantity} ]})
            },
            removeKitFromSelected: (id: string) => {
                const {kitsSelected} = get();
                const kitsSelectedUpdated = kitsSelected.filter (
                    (item) => item.id !== id
                )
                set({kitsSelected:kitsSelectedUpdated})
            },
            updateQuantityKitSelected: (id: string, quantity: number) => {
                const {kitsSelected} = get();
                const kitsSelectedUpdated = kitsSelected.map(
                    (item) => item.id === id ? {...item, quantity} : item
                )
                set({kitsSelected:kitsSelectedUpdated})
            },
            emptyKitsSelected: () => {
                set({kitsSelected:[]})
            }        
        }),
        {
            name: "kits-store"
        }
    )
)