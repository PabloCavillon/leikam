import { Client } from "./client.interface";
import { QuoteDetail } from "./quoteDetail.interface";

export type State = 'Pendient' | 'Accepted' | 'Canceled';

export interface Quote {
    id: string; 
    client?: Client; 
    creation_date: Date;
    total_amount: number;
    dolar_value: number;
    slug: string;
    labor_cost:number;
    advance_payment: number;
    details: QuoteDetail[];
    state: State;
}