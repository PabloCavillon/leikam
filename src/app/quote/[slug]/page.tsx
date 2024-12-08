import { getQuoteBySlug } from "@/actions";
import { TableQuote } from "./TableQuote";

type Params = Promise<{slug: string}>

export default async function QuoteBySlugPage({params} : {params: Params}) {
    const { slug } = await params; 

    const quote = await getQuoteBySlug(slug);

    return (
        <TableQuote quote={quote} />
    );
}