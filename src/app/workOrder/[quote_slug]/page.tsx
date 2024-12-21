import { getQuoteBySlug } from "@/actions";
import { redirect } from "next/navigation";


type Params = Promise<{quote_slug:string}>;


export default async function CreateWorkOrderPage({params}: {params:Params}) {
  
    const {quote_slug} = await params
    
    const quote = await getQuoteBySlug(quote_slug);
  
    if (!quote) {
        alert('No se encontró el presupuesto selccionado');
        redirect('/quotes');
    }

    return (  
        <div>
            <h1>Hello Page</h1>
        </div>
    );
}