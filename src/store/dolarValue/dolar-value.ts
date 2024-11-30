import { create } from "zustand";
import { persist } from 'zustand/middleware';

interface State {
    dolarValue: number;
    updateDolarValue: (newValue: number) => void;
}

export const useDolarValue = create<State> () (
    
    persist(
        (set, get) => ({
            dolarValue: 0,
            
            updateDolarValue: (newValue: number) => {
                set({dolarValue: newValue})
            }
        }),
        {
            name:"dolar-value"
        }
    )
    
)

