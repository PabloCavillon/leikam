import { Quote } from "@/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";


interface State {

    quotesList: Quote[];
    quoteSelected: Quote | null;

    selectQuote: (quote: Quote) => void;
    deselectQuote: () => void;
    loadQuotesList: (quotes: Quote[]) => void;

    addQupoteToList: (quote: Quote) => void;
    removeQuoteToList: (id: string) => void;

}

export const useQuotesStore = create<State> () (
    persist(
        (set, get) => ({
            quotesList: [],
            quoteSelected: null,
           
            selectQuote: (quote: Quote) => {
                set({quoteSelected: quote})
            },

            deselectQuote: () => {
                set({quoteSelected: null})
            },

            loadQuotesList: (quotes: Quote[]) => {
                set({quotesList: quotes})
            },

            addQupoteToList: (quote: Quote) => {
                const {quotesList} = get();

                const quoteInList = quotesList.some(
                    (item) => item.id === quote.id
                )

                if(!quoteInList)
                    set({quotesList:[...quotesList, quote]})
            },

            removeQuoteToList: (id: string) => {
                const {quotesList} = get();
                const quoteListUpdated = quotesList.filter (
                    (item) => item.id !== id
                )                
                set({quotesList: quoteListUpdated})
            },
        }),
        {
            name: "quotes-store",
        }
    ),
);
