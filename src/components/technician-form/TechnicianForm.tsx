'use client';

import {
    createAddress,
    createTechnician,
    getTechnicianById,
    updateAddress,
    updateTechnician,
} from "@/actions";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

type FormInputs = {
    first_name: string;
    last_name: string;
    phone: string;
    email: string;
    dni: string;
    criminal_records: boolean;
    birthday: Date;
    street: string;
    number: string;
    floor: string;
    apartment: string;
    city: string;
    state: string;
    postal_code: string;
    additional_comment: string;
};

interface Props {
    id_technician?: string;
}

export const TechnicianForm = ({ id_technician }: Props) => {
    const {
        handleSubmit,
        register,
        reset,
        formState: { isValid },
    } = useForm<FormInputs>();
    const [isLoading, setIsLoading] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [idAddressToEdit, setIdAddressToEdit] = useState<string>("");
    const [idTechnicianToEdit, setIdTechnicianToEdit] = useState<string>("");
    const router = useRouter();

    useEffect(() => {
        const resolveProps = async () => {
            if (!id_technician) return setIsLoading(true);
            const technicianBD = await getTechnicianById(id_technician);
            if (technicianBD) {
                setIsEdit(true);
                setIdAddressToEdit(technicianBD.address.id);
                setIdTechnicianToEdit(technicianBD.id);
                reset({
                    first_name: technicianBD.first_name,
                    last_name: technicianBD.last_name,
                    phone: technicianBD.phone || "",
                    email: technicianBD.email || "",
                    dni: technicianBD.dni,
                    criminal_records: technicianBD.criminal_records,
                    birthday: technicianBD.birthday || new Date(),
                    street: technicianBD.address.street,
                    number: technicianBD.address.number,
                    floor: technicianBD.address.floor || "",
                    apartment: technicianBD.address.apartment || "",
                    city: technicianBD.address.city,
                    state: technicianBD.address.state,
                    postal_code: technicianBD.address.postal_code,
                    additional_comment:
                        technicianBD.address.additional_comment || "",
                });
            }
            setIsLoading(true);
        };
        resolveProps();
    }, [id_technician]);

    const onSubmit = async (data: FormInputs) => {
        const {
            first_name,
            last_name,
            phone,
            email,
            dni,
            criminal_records,
            birthday,
            street,
            number,
            floor,
            apartment,
            city,
            state,
            postal_code,
            additional_comment,
        } = data;

        const addressForm = {
            street,
            number,
            floor,
            apartment,
            city,
            state,
            postal_code,
            additional_comment,
        };
        const technicianForm = {
            first_name,
            last_name,
            phone,
            email,
            dni,
            criminal_records,
            birthday: new Date(birthday),
        };

        try {
            if (!isEdit) {
                const address_id = await createAddress({ ...addressForm });
                const technician_id = await createTechnician({
                    ...technicianForm,
                    address_id,
                });
                if (!technician_id) throw new Error("Error al crear el técnico.");
            } else {
                await updateAddress({ ...addressForm, id: idAddressToEdit });
                await updateTechnician({
                    ...technicianForm,
                    id: idTechnicianToEdit,
                });
            }
            router.push("/technicians");
        } catch (error) {
            console.error(error);
        }
    };

    if (!isLoading)
        return <p className="text-center text-gray-300">Cargando...</p>;

    return (
        <div className="flex justify-center items-center flex-grow bg-gray-900 p-6">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full max-w-5xl bg-gray-800 rounded-lg shadow-lg p-6 space-y-8"
            >
                <div className="grid grid-cols-2 gap-6">
                    {/* Datos del Técnico */}
                    <div>
                        <h2 className="text-lg font-semibold text-gray-300 mb-4">
                            Datos del Técnico
                        </h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm text-gray-300">
                                    Nombre *
                                </label>
                                <input
                                    type="text"
                                    {...register("first_name", { required: true })}
                                    className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-gray-200 focus:ring-2 focus:ring-orange-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-300">
                                    Apellido *
                                </label>
                                <input
                                    type="text"
                                    {...register("last_name", { required: true })}
                                    className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-gray-200 focus:ring-2 focus:ring-orange-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-300">
                                    Documento *
                                </label>
                                <input
                                    type="text"
                                    {...register("dni", { required: true })}
                                    className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-gray-200 focus:ring-2 focus:ring-orange-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-300">
                                    Fecha de Nacimiento *
                                </label>
                                <input
                                    type="date"
                                    {...register("birthday", { required: true })}
                                    className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-gray-200 focus:ring-2 focus:ring-orange-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-300">
                                    Teléfono *
                                </label>
                                <input
                                    type="text"
                                    {...register("phone", { required: true })}
                                    className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-gray-200 focus:ring-2 focus:ring-orange-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-300">
                                    Correo Electrónico
                                </label>
                                <input
                                    type="email"
                                    {...register("email")}
                                    className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-gray-200 focus:ring-2 focus:ring-orange-500"
                                />
                            </div>
                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    {...register("criminal_records")}
                                    className="h-5 w-5 text-orange-500 focus:ring-2 focus:ring-orange-500 rounded"
                                />
                                <label className="text-sm text-gray-300">
                                    Antecedentes Verificados
                                </label>
                            </div>
                        </div>
                    </div>
                    {/* Dirección */}
                    <div>
                        <h2 className="text-lg font-semibold text-gray-300 mb-4">
                            Dirección del Técnico
                        </h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm text-gray-300">
                                    Calle *
                                </label>
                                <input
                                    type="text"
                                    {...register("street", { required: true })}
                                    className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-gray-200 focus:ring-2 focus:ring-orange-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-300">
                                    Número *
                                </label>
                                <input
                                    type="text"
                                    {...register("number", { required: true })}
                                    className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-gray-200 focus:ring-2 focus:ring-orange-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-300">
                                    Piso
                                </label>
                                <input
                                    type="text"
                                    {...register("floor")}
                                    className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-gray-200 focus:ring-2 focus:ring-orange-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-300">
                                    Departamento
                                </label>
                                <input
                                    type="text"
                                    {...register("apartment")}
                                    className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-gray-200 focus:ring-2 focus:ring-orange-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-300">
                                    Ciudad *
                                </label>
                                <input
                                    type="text"
                                    {...register("city", { required: true })}
                                    className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-gray-200 focus:ring-2 focus:ring-orange-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-300">
                                    Provincia *
                                </label>
                                <input
                                    type="text"
                                    {...register("state", { required: true })}
                                    className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-gray-200 focus:ring-2 focus:ring-orange-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-300">
                                    Código Postal *
                                </label>
                                <input
                                    type="text"
                                    {...register("postal_code", { required: true })}
                                    className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-gray-200 focus:ring-2 focus:ring-orange-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-300">
                                    Comentarios Adicionales
                                </label>
                                <textarea
                                    {...register("additional_comment")}
                                    className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-gray-200 focus:ring-2 focus:ring-orange-500 resize-none"
                                ></textarea>
                            </div>
                        </div>
                    </div>
                </div>
                <button
                    type="submit"
                    className={clsx(
                        "w-full py-2 rounded bg-orange-600 text-gray-900 font-semibold hover:bg-orange-500",
                        !isValid && "opacity-50 cursor-not-allowed"
                    )}
                >
                    {isEdit ? "Actualizar Técnico" : "Crear Técnico"}
                </button>
            </form>
        </div>
    );
};
