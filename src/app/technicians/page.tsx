 'use client';

import {
    activateTechnician,
    desactivateTechnician,
    getAllTechnicians,
} from "@/actions";
import { Technician } from "@/interfaces";
import { formatNumber } from "@/util";
import clsx from "clsx";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function CreateTechnicianPage() {
    const [technicians, setTechnicians] = useState<Technician[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const resolveData = async () => {
            try {
                const technicians_BD = await getAllTechnicians();
                setTechnicians(technicians_BD);
            } catch (err) {
                console.error("Ocurrió un error al obtener los técnicos:", err);
            }
            setIsLoading(true);
        };
        resolveData();
    }, []);

    const handleClickDeactive = async (id: string) => {
        const technicianDeactivated = await desactivateTechnician(id);
        if (!technicianDeactivated) return;
        setTechnicians((prev) =>
            prev.map((t) => (t.id === id ? technicianDeactivated : t))
        );
    };

    const handleClickActive = async (id: string) => {
        const technicianActivated = await activateTechnician(id);
        if (!technicianActivated) return;
        setTechnicians((prev) =>
            prev.map((t) => (t.id === id ? technicianActivated : t))
        );
    };

    if (!isLoading) return <p className="text-center text-gray-500">Cargando...</p>;

    return (
        <div className="p-6 bg-gray-900 h-auto">
            <div className="mb-6 flex justify-end">
                <Link
                    href="/technicians/create"
                    className="bg-orange-600 text-white px-6 py-2 rounded-lg text-sm font-semibold shadow hover:bg-orange-500 transition"
                >
                    Crear técnico
                </Link>
            </div>
            {technicians.length > 0 && (
                <div className="overflow-hidden shadow-lg rounded-lg bg-gray-800">
                    <table className="table-auto w-full text-gray-300">
                        <thead className="bg-gradient-to-r from-orange-600 via-orange-500 to-orange-400 text-white">
                            <tr>
                                <th className="px-6 py-3 text-center text-sm font-semibold uppercase">
                                    Nombre
                                </th>
                                <th className="px-6 py-3 text-center text-sm font-semibold uppercase">
                                    Mail
                                </th>
                                <th className="px-6 py-3 text-center text-sm font-semibold uppercase">
                                    Teléfono
                                </th>
                                <th className="px-6 py-3 text-center text-sm font-semibold uppercase">
                                    Nota
                                </th>
                                <th className="px-6 py-3 text-center text-sm font-semibold uppercase">
                                    Trabajos realizados
                                </th>
                                <th className="px-6 py-3 text-center text-sm font-semibold uppercase">
                                    Acciones
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {technicians.map((t, index) => (
                                <tr
                                    key={t.id}
                                    className={clsx(
                                        "transition",
                                        t.active
                                            ? `${
                                                  index % 2 === 0
                                                      ? "bg-gray-700"
                                                      : "bg-gray-800"
                                              } hover:bg-gray-600`
                                            : "bg-red-700 hover:bg-red-600"
                                    )}
                                >
                                    <td className="px-6 py-4 text-sm text-center">
                                        {t.last_name.toUpperCase()}, {t.first_name}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-center">
                                        {t.email || "-"}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-center">
                                        {t.phone}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-center">
                                        {formatNumber(t.stats?.average || 0, 2)}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-center">
                                        {formatNumber(t.stats?.quantity || 0, 0)}
                                    </td>
                                    <td className="px-6 py-4 flex gap-3 justify-center">
                                        <Link
                                            href={`/workOrders/${t.id}`}
                                            className="text-blue-400 hover:text-blue-500 transition hover:underline"
                                        >
                                            Ver trabajos
                                        </Link>
                                        <Link
                                            href={`/technicians/edit/${t.id}`}
                                            className="text-gray-400 hover:text-gray-500 transition hover:underline"
                                        >
                                            Editar
                                        </Link>
                                        {t.active ? (
                                            <button
                                                onClick={() => handleClickDeactive(t.id)}
                                                className="text-red-400 hover:text-red-500 transition hover:underline"
                                            >
                                                Dar de baja
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => handleClickActive(t.id)}
                                                className="text-green-400 hover:text-green-500 transition hover:underline"
                                            >
                                                Dar de alta
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
            {technicians.length === 0 && (
                <p className="text-center text-gray-500 mt-4">
                    No hay técnicos cargados.
                </p>
            )}
        </div>
    );
}
