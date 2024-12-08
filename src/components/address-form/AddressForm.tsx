"use client"

import { useForm } from "react-hook-form";

type FormInputs = {
     street: string;
     streetNumber: string;
     floor: number;
     apartment: string;
     city: string;
     province: string;
     country: string;
     postalCode: string;
     additionalComment: string;
}

export const AddressForm = () => {
    const {handleSubmit, register} = useForm<FormInputs>({
        defaultValues:{}
    })

    const onSubmit = async(/*data:FormInputs*/) => {

    }

    return (
        <form onSubmit={ handleSubmit( onSubmit ) }  className="grid grid-cols-1 gap-2 sm:gap-5 sm:grid-cols-2">
            <div className="flex flex-col mb-2">
                <span>Calle</span>
                <input type="text" className="p-2 border rounded-md bg-gray-200" { ...register('street', { required: true  }) } />
            </div>
  
            <div className="flex flex-col mb-2">
                <span>Altura</span>
                <input type="text" className="p-2 border rounded-md bg-gray-200" { ...register('streetNumber', { required: true  }) } />
            </div>

            <div className="flex flex-col mb-2">
                <span>Piso</span>
                <input type="text" className="p-2 border rounded-md bg-gray-200" { ...register('floor', { required: true  }) } />
            </div>
            
            <div className="flex flex-col mb-2">
                <span>Departamento</span>
                <input type="date" className="p-2 border rounded-md bg-gray-200" { ...register('apartment', { required: true  }) } />
            </div>

            <div className="flex flex-col mb-2">
                <span>Pais</span>
                <input type="checkbox" className="p-2 border rounded-md bg-gray-200" { ...register('country') } />
            </div>

            <div className="flex flex-col mb-2">
                <span>Provincia</span>
                <input type="checkbox" className="p-2 border rounded-md bg-gray-200" { ...register('province') } />
            </div>

            <div className="flex flex-col mb-2">
                <span>Ciudad</span>
                <input type="checkbox" className="p-2 border rounded-md bg-gray-200" { ...register('city') } />
            </div>

            <div className="flex flex-col mb-2">
                <span>Código Postal</span>
                <input type="checkbox" className="p-2 border rounded-md bg-gray-200" { ...register('postalCode') } />
            </div>

            <div className="flex flex-col mb-2">
                <span>Aclaración adicional</span>
                <input type="checkbox" className="p-2 border rounded-md bg-gray-200" { ...register('additionalComment') } />
            </div>
        </form>
    )
}