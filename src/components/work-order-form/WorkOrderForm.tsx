'use client'

import { Quote, Technician } from "@/interfaces"
import { formatDate } from '../../util/format-date';
import { ClientForm } from "../client-form/ClientForm";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { getActiveTechnicians } from "@/actions";

interface Props {
    quote: Quote;
}

interface FormInputs {
    creation_date: Date;
    technicians: Technician[];
}


export const WorkOrderForm = ({quote}: Props) => {

    const [isLoading, setIsLoading] = useState(false);
    const [technicians, setTechnicians] = useState<Technician[]>([]);

    useEffect(() => {
        const resolveTechnicians = async () => {
            const activeTechnicians = await getActiveTechnicians();
            setTechnicians(activeTechnicians);
            setIsLoading(true);
        }
        resolveTechnicians();
    }, [quote]);

    const {register, handleSubmit, formState: {isValid}} = useForm<FormInputs>();

    const onSubmit = (data: FormInputs) => {
        console.log(data);
    }

    if (!isLoading)
        return <div>Loading...</div>

    return (
        <div className="text-white">
            <ClientForm />
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label>Fecha de creación:</label>
                    <input type="date" {...register("creation_date", {required: true})} defaultValue={formatDate((new Date()).toString())} />
                </div>
                <div>
                    <label>Técnicos:</label>

                    <select {...register("technicians", {required: true})}>
                        {technicians.map(tech => (
                            <option key={tech.id} value={tech.id}>{tech.first_name} {tech.last_name}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <button type="submit" disabled={!isValid}>Crear</button>
                </div>
            </form>
        </div>
    )

}