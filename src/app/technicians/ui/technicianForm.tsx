"use client"

import { useForm } from "react-hook-form";

type FormInputs = {
    firstName: string;
    lastName:string;
    document: number;
    birthday: Date;
    verifiedCriminalRecords: boolean;
}

export const TechnicianForm = () => {
    
    const { handleSubmit, register, formState: { isValid }, reset } = useForm<FormInputs>({
        defaultValues: {}
    })

    //const {data: session} = useSession({
    //    required: true,
    //})

    const onSubmit = async(data:FormInputs) => {
        
    }

    return (
        <form onSubmit={ handleSubmit( onSubmit ) }  className="grid grid-cols-1 gap-2 sm:gap-5 sm:grid-cols-2">
            <div className="flex flex-col mb-2">
                <span>Nombres</span>
                <input type="text" className="p-2 border rounded-md bg-gray-200" { ...register('firstName', { required: true  }) } />
            </div>
  
            <div className="flex flex-col mb-2">
                <span>Apellidos</span>
                <input type="text" className="p-2 border rounded-md bg-gray-200" { ...register('lastName', { required: true  }) } />
            </div>

            <div className="flex flex-col mb-2">
                <span>DNI</span>
                <input type="text" className="p-2 border rounded-md bg-gray-200" { ...register('document', { required: true  }) } />
            </div>
            
            <div className="flex flex-col mb-2">
                <span>Fecha de Nacimiento</span>
                <input type="date" className="p-2 border rounded-md bg-gray-200" { ...register('birthday', { required: true  }) } />
            </div>

            <div className="flex flex-col mb-2">
                <span>Antecendentes Verificados</span>
                <input type="checkbox" className="p-2 border rounded-md bg-gray-200" { ...register('verifiedCriminalRecords') } />
            </div>
        </form>
    )
}