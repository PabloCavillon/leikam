import { gettAllQuotes } from "@/actions";
import TableQuotes from "./ui/TableQuotes";

export default async function PresupuestoPage() {
  
  const quotes = await gettAllQuotes();

  return (
    <div>
      <TableQuotes quotes={quotes}/>
    </div>
  );
}