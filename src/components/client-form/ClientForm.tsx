'use client';

import { useForm } from "react-hook-form";

export const ClientForm = () => {
    const { register, handleSubmit, formState: { isValid } } = useForm();

    return (
        <form onSubmit={handleSubmit(console.log)} className="space-y-6 bg-gray-800 p-6 rounded-lg shadow-lg">
            {/* Nombre */}
            <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300" htmlFor="first_name">
                    Nombre:
                </label>
                <input
                    type="text"
                    id="first_name"
                    {...register("first_name", { required: true })}
                    className="w-full p-3 rounded bg-gray-700 border border-gray-600 text-gray-200 focus:ring-2 focus:ring-orange-500"
                />
            </div>

            {/* Apellido */}
            <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300" htmlFor="last_name">
                    Apellido:
                </label>
                <input
                    type="text"
                    id="last_name"
                    {...register("last_name", { required: true })}
                    className="w-full p-3 rounded bg-gray-700 border border-gray-600 text-gray-200 focus:ring-2 focus:ring-orange-500"
                />
            </div>

            {/* Teléfono */}
            <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300" htmlFor="phone">
                    Teléfono:
                </label>
                <input
                    type="text"
                    id="phone"
                    {...register("phone", { required: true })}
                    className="w-full p-3 rounded bg-gray-700 border border-gray-600 text-gray-200 focus:ring-2 focus:ring-orange-500"
                />
            </div>

            {/* Email */}
            <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300" htmlFor="email">
                    Email:
                </label>
                <input
                    type="text"
                    id="email"
                    {...register("email")}
                    className="w-full p-3 rounded bg-gray-700 border border-gray-600 text-gray-200 focus:ring-2 focus:ring-orange-500"
                />
            </div>

            {/* Dirección */}
            <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-300" htmlFor="street">
                        Calle:
                    </label>
                    <input
                        type="text"
                        id="street"
                        {...register("street", { required: true })}
                        className="w-full p-3 rounded bg-gray-700 border border-gray-600 text-gray-200 focus:ring-2 focus:ring-orange-500"
                    />
                </div>
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-300" htmlFor="number">
                        Altura:
                    </label>
                    <input
                        type="text"
                        id="number"
                        {...register("number", { required: true })}
                        className="w-full p-3 rounded bg-gray-700 border border-gray-600 text-gray-200 focus:ring-2 focus:ring-orange-500"
                    />
                </div>
            </div>

            {/* Piso y Departamento */}
            <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-300" htmlFor="floor">
                        Piso:
                    </label>
                    <input
                        type="text"
                        id="floor"
                        {...register("floor")}
                        className="w-full p-3 rounded bg-gray-700 border border-gray-600 text-gray-200 focus:ring-2 focus:ring-orange-500"
                    />
                </div>
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-300" htmlFor="apartment">
                        Departamento:
                    </label>
                    <input
                        type="text"
                        id="apartment"
                        {...register("apartment")}
                        className="w-full p-3 rounded bg-gray-700 border border-gray-600 text-gray-200 focus:ring-2 focus:ring-orange-500"
                    />
                </div>
            </div>

            {/* Ciudad y Provincia */}
            <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-300" htmlFor="city">
                        Ciudad:
                    </label>
                    <input
                        type="text"
                        id="city"
                        {...register("city", { required: true })}
                        className="w-full p-3 rounded bg-gray-700 border border-gray-600 text-gray-200 focus:ring-2 focus:ring-orange-500"
                    />
                </div>
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-300" htmlFor="state">
                        Provincia:
                    </label>
                    <input
                        type="text"
                        id="state"
                        {...register("state", { required: true })}
                        className="w-full p-3 rounded bg-gray-700 border border-gray-600 text-gray-200 focus:ring-2 focus:ring-orange-500"
                    />
                </div>
            </div>

            {/* Código Postal */}
            <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300" htmlFor="postal_code">
                    Código Postal:
                </label>
                <input
                    type="text"
                    id="postal_code"
                    {...register("postal_code", { required: true })}
                    className="w-full p-3 rounded bg-gray-700 border border-gray-600 text-gray-200 focus:ring-2 focus:ring-orange-500"
                />
            </div>

            {/* Comentarios Adicionales */}
            <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300" htmlFor="additional_comment">
                    Comentarios Adicionales:
                </label>
                <textarea
                    id="additional_comment"
                    {...register("additional_comment")}
                    className="w-full p-3 rounded bg-gray-700 border border-gray-600 text-gray-200 focus:ring-2 focus:ring-orange-500 resize-none"
                    rows={4}
                ></textarea>
            </div>

            {/* Botón Guardar */}
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
                    Guardar
                </button>
            </div>
        </form>
    );
};
