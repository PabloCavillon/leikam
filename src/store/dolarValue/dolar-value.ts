import { create } from "zustand";
import { persist } from 'zustand/middleware';

interface State {
    dolarValue: number;
    setDolarValue: (newValue: number) => void;
}

export const useDolarValue = create<State> () (
    
    persist(
        (set) => ({
            dolarValue: 0,
            
            setDolarValue: (newValue: number) => {
                set({dolarValue: newValue})
            }
        }),
        {
            name:"dolar-value"
        }
    )
    
)

