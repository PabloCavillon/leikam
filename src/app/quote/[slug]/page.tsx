
import { getQuoteBySlug } from "@/actions";
import { TableQuote } from "./TableQuote";

interface Props {
    params: {
        slug:string
    }
}

export default async function  QuoteBySlugPage ({params}: Props) {

    const {slug} = await params;

    const quote = await getQuoteBySlug(slug);

    return (
        <TableQuote quote={quote} />
    );
}