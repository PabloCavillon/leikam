"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Address, Technician } from "@/interfaces";

type FormInputs = {
    id: string;
    first_name: string;
    last_name: string;
    dni: string;
    birthday: Date;
    criminal_records: boolean;
    address: Address;
};

interface Props {
    functionOnSubmit: (technician: Technician) => {};
    technician?: Technician;
}

export const TechnicianForm = ({ technician, functionOnSubmit }: Props) => {
    const { handleSubmit, register, reset } = useForm<FormInputs>({
        defaultValues: technician || {}, // Inicializa con los datos del técnico si existen
    });

    useEffect(() => {
        if (technician) {
            reset(technician); // Actualiza el formulario si cambia el técnico
        }
    }, [technician, reset]);

    const onSubmit = (data: FormInputs) => {
        functionOnSubmit(data); // Enviar datos a la función padre
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-1 gap-2 sm:gap-5 sm:grid-cols-2"
        >
            <div className="flex flex-col mb-2">
                <span>Nombres</span>
                <input
                    type="text"
                    className="p-2 border rounded-md bg-gray-200"
                    {...register("first_name", { required: true })}
                />
            </div>

            <div className="flex flex-col mb-2">
                <span>Apellidos</span>
                <input
                    type="text"
                    className="p-2 border rounded-md bg-gray-200"
                    {...register("last_name", { required: true })}
                />
            </div>

            <div className="flex flex-col mb-2">
                <span>DNI</span>
                <input
                    type="text"
                    className="p-2 border rounded-md bg-gray-200"
                    {...register("dni", { required: true })}
                />
            </div>

            <div className="flex flex-col mb-2">
                <span>Fecha de Nacimiento</span>
                <input
                    type="date"
                    className="p-2 border rounded-md bg-gray-200"
                    {...register("birthday", { required: true })}
                />
            </div>

            <div className="flex flex-col mb-2">
                <span>Antecendentes Verificados</span>
                <input
                    type="checkbox"
                    className="p-2 border rounded-md bg-gray-200"
                    {...register("criminal_records")}
                />
            </div>

            <div className="sm:col-span-2 flex justify-end">
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-md"
                >
                    {technician ? "Editar Técnico" : "Crear Técnico"}
                </button>
            </div>
        </form>
    );
};
