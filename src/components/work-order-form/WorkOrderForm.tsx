'use client';

import { Quote, Technician } from "@/interfaces";
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

export const WorkOrderForm = ({ quote }: Props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [technicians, setTechnicians] = useState<Technician[]>([]);

    useEffect(() => {
        const resolveTechnicians = async () => {
            const activeTechnicians = await getActiveTechnicians();
            setTechnicians(activeTechnicians);
            setIsLoading(true);
        };
        resolveTechnicians();
    }, [quote]);

    const { register, handleSubmit, formState: { isValid } } = useForm<FormInputs>();

    const onSubmit = (data: FormInputs) => {
        console.log(data);
    };

    if (!isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-900 text-gray-300">
                <p className="text-lg">Cargando...</p>
            </div>
        );
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-900 p-6">
            <div className="w-full max-w-4xl bg-gray-800 rounded-lg shadow-lg p-6 space-y-6">
                <h1 className="text-2xl font-bold text-orange-500 mb-4">Crear Orden de Trabajo</h1>
                <ClientForm />
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Campo Fecha de Creación */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-300">Fecha de creación:</label>
                        <input
                            type="date"
                            {...register("creation_date", { required: true })}
                            defaultValue={formatDate((new Date()).toString())}
                            className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-gray-200 focus:ring-2 focus:ring-orange-500"
                        />
                    </div>

                    {/* Campo Técnicos */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-300">Técnicos:</label>
                        <select
                            {...register("technicians", { required: true })}
                            className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-gray-200 focus:ring-2 focus:ring-orange-500"
                        >
                            {technicians.map(tech => (
                                <option key={tech.id} value={tech.id}>
                                    {tech.first_name} {tech.last_name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Botón Crear */}
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={!isValid}
                            className={`py-2 px-4 rounded ${
                                isValid
                                    ? "bg-orange-600 text-gray-900 hover:bg-orange-500"
                                    : "bg-gray-600 text-gray-400 cursor-not-allowed"
                            } font-semibold transition`}
                        >
                            Crear
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
