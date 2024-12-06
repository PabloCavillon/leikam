import { Client } from "./client.interface";
import { QuoteDetail } from "./quoteDetail.interface";

export type State = 'Pendient' | 'Accepted' | 'Canceled';

export interface Quote {
    id: string; 
    client?: Client; 
    creationDate: Date;
    totalAmount: number;
    dolarValue: number;
    slug: string;
    laborCost:number;
    deposit:number;
    details: QuoteDetail[];
    state: State;
}