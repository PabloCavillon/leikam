"use client";

import { getTechnicianById } from "@/actions";
import { ProductForm } from "@/components/product-form/ProductForm";
import { TechnicianForm } from "@/components/technician-form/TechnicianForm";
import { Technician } from "@/interfaces";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";

type Params = Promise<{ id: string }>;

export default function EditTechnicianPage({ params }: { params: Params }) {
    const [technician, setTechnician] = useState<Technician>();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const resolveParams = async () => {
            try {
                const { id } = await params;
                const techincianBD = await getTechnicianById(id);

                if (techincianBD) setTechnician(techincianBD);
            } catch (err) {
                console.log("Ocurrio un error al obtener al técnico:", err);
            }
            setIsLoading(true);
        };
        resolveParams();
    }, [params]);

    if (!isLoading) return <p>Cargando...</p>;

    if (!technician) notFound();

    return <TechnicianForm id_technician={technician.id} />;
}
