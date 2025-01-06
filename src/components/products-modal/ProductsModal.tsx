'use client'

import { ImCross } from "react-icons/im";
import { TableProducts } from "../table-products/TableProducts";

interface Props {
    handleClose: () => void;
}

export const ProductsModal = ({handleClose}: Props) => {

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
            <div className="absolute inset-0 p-6 overflow-auto flex flex-col items-end gap-3">
                <button 
                    className="bg-orange-600 text-gray-900 px-6 py-2 rounded-lg text-lg font-semibold hover:bg-orange-500 transition"
                    onClick={handleClose}
                >
                    <ImCross />
                </button>
                <TableProducts />
            </div>
        </div>
    );

}