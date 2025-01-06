'use client'

import { useForm } from "react-hook-form";

interface ClientWithAddress {
    first_name: string;
    last_name: string;
    phone: string;
    email?: string; 

    street: string;
    number: string;
    floor: string;
    apartment: string;
    city: string;
    state: string;
    postal_code: string;
    additional_comment: string;
}


export const ClientForm = () => {

    const {register, handleSubmit, reset, formState: {isValid}} = useForm();

    const onSubmit = (data: any) => {

    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label>Nombre:</label>
                <input type="text" {...register("first_name", {required: true})} />
            </div>

            <div>
                <label>Apellido:</label>
                <input type="text" {...register("last_name", {required: true})} />
            </div>

            <div>
                <label>Telefono:</label>
                <input type="text" {...register("phone", {required: true})} />
            </div>

            <div>
                <label>Email:</label>
                <input type="text" {...register("email", {required: false})} /> 
            </div>

            <div>
                <label>Calle:</label>
                <input type="text" {...register("street", {required: true})} />
            </div>

            <div>
                <label>Altura:</label>
                <input type="text" {...register("number", {required: true})} />
            </div>

            <div>
                <label>Piso:</label>
                <input type="text" {...register("floor", {required: false})} />
            </div>

            <div>
                <label>Departamento:</label>
                <input type="text" {...register("apartment", {required: false})} />
            </div>

            <div>
                <label>Ciudad:</label>
                <input type="text" {...register("city", {required: true})} />
            </div>

            <div>
                <label>Provincia:</label>
                <input type="text" {...register("state", {required: true})} />
            </div>

            <div>
                <label>Código Postal:</label>
                <input type="text" {...register("postal_code", {required: true})} />
            </div>

            <div>
                <label>Comentarios Adicionales:</label>
                <textarea {...register("additional_comment", {required: false})} />
            </div>

            <button type="submit" disabled={!isValid}>Guardar</button>
        </form>
    )

}