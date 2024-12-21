import { Technician } from "@/interfaces";
import { TechnicianForm } from "../ui/form-technicians";

export default function NamePage() {

    const handleSubmit = (tehcnician: Technician) => {

    }

    return (
        <div>
            <h1>Cargar nuevo técnico</h1>
            <TechnicianForm onSubmit={handleSubmit}/>
        </div>
    );
}