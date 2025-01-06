import { Kit, Product } from "@/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
    kitsList: Kit[];
    kitsSelected: Kit[];

    loadKitsList: (kits: Kit[]) => void;
    addKitToList: (kit: Kit) => void;
    removeKitToList: (id: string) => void;
    
    verifyKitIsSelected: (id: string) => boolean;
    addKitToSelected: (kit: Kit) => void;
    removeKitFromSelected: (id: string) => void;
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

            addKitToList: (kit:Kit) => {
                const {kitsList} = get();

                const kitInList = kitsList.some(
                    (item) => item.id === kit.id
                )

                if(!kitInList)
                    set({kitsList:[...kitsList, kit]})
            },
            removeKitToList: (id: string) => {
                const {kitsList} = get();
                const kitsListUpdated = kitsList.filter (
                    (item) => item.id !== id
                )
                set({kitsList:kitsListUpdated})
            },
            verifyKitIsSelected: (id: string) => {
                const {kitsSelected} = get();
                return kitsSelected.some(
                    (item) => item.id === id
                )
            },
            addKitToSelected: (kit: Kit) => {
                const {kitsSelected} = get();
                const kitInList = kitsSelected.some(
                    (item) => item.id === kit.id
                )
                if(!kitInList)
                    set({kitsSelected:[...kitsSelected, kit]})
            },
            removeKitFromSelected: (id: string) => {
                const {kitsSelected} = get();
                const kitsSelectedUpdated = kitsSelected.filter (
                    (item) => item.id !== id
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