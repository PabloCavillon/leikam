'use client'

import { useEffect, useState } from "react";
import { useKitsStore } from "@/store";
import { getAllKits } from "@/actions";
import { formatNumber } from '../../util/format-number';
import { useRouter } from "next/navigation";
import Link from "next/link";
import { MdOutlineRequestQuote } from "react-icons/md";
import clsx from "clsx";

export default function PromocionalKitsPage() {
  
	const kitsList = useKitsStore((state) => state.kitsList);
	const kitsSelected = useKitsStore((state) => state.kitsSelected);
	const loadKitsList = useKitsStore((state) => state.loadKitsList);
	const addKitToSelected = useKitsStore((state) => state.addKitToSelected);
	const removeKitFromSelected = useKitsStore((state) => state.removeKitFromSelected);
	const verifyKitIsSelected = useKitsStore((state) => state.verifyKitIsSelected);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const router = useRouter();

  	useEffect(() => {
		const fetchKits = async () => {
			try {
				const kits = await getAllKits();
				loadKitsList(kits);
				console.log(kits)
			} catch (error) {
				console.log(error);
			}
			setIsLoading(true);
		}
		fetchKits();
	}, [loadKitsList]);

	useEffect(() => {}, [kitsSelected]);

	const handleClick = (id: string) => {
		if (verifyKitIsSelected(id.toString())) {
			removeKitFromSelected(id.toString());
		} else {
			const kit = kitsList.find((kit) => kit.id === id);
			if (!kit) return;
			addKitToSelected(kit);
		}
		console.log(kitsSelected);
	}
  
	if (!isLoading) 
		return <div>Loading...</div>

	return (
		<div className="flex justify-center flex-col items-center">
			<div className="p-4 sm:p-6 w-4/5 flex flex-col justify-end gap-3">
                <div className="mb-6 flex flex-col sm:flex-row justify-end sm:gap-3 gap-4 items-stretch sm:items-center">
                    <Link
                        href="/quotes/create"
                        className="bg-orange-600 text-white px-4 sm:px-6 py-2 rounded-lg flex items-center gap-2 font-semibold shadow hover:bg-orange-500 transition justify-center"
                    >
                        <MdOutlineRequestQuote size={25} />
                        <span>Crear presupuesto</span>
                    </Link>
                </div>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 px-10 lg:grid-cols-3 gap-6 text-gray-300 bg-gray-900 w-full max-w-7xl cursor-pointer">
				{kitsList.map((kit) => (
					<div
						key={kit.id}
						className={clsx(" rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition transform hover:scale-105 relative flex flex-col justify-between",
							verifyKitIsSelected(kit.id.toString()) ? 'border-2 border-orange-500 bg-white text-gray-800' : 'border-2 border-transparent bg-gray-800'
						)}
						onDoubleClick={() => router.push('/kits/edit/' + kit.slug)}
						onClick={() => handleClick(kit.id)}
						
					>
						{/* Encabezado */}
						<div className="bg-gradient-to-r from-orange-600 to-orange-500 p-4">
							<h1 className="text-lg font-bold text-white">{kit.name}</h1>
						</div>

						{/* Lista de Productos */}
						<div className="p-6 space-y-4">
							<ul className="list-disc list-inside space-y-3 text-sm text-gray-300">
								{kit.products.map((product) => (
									<li key={product.id} className="text-gray-400 flex items-center gap-2">
										<span className="text-orange-400 font-bold text-base">
											{product.quantity}
										</span>
										<span>x</span>
										<span>{product.product.name}</span>
									</li>
								))}
							</ul>
						</div>

						{/* Línea Divisoria */}
						<div className="mt-auto">
							<div className="border-t border-gray-700"></div>

							{/* Precio */}
							<div className="p-4 flex justify-between items-center">
								<span className="text-sm text-gray-400">Precio total</span>
								<span className="text-2xl font-bold text-orange-400">
									$ {formatNumber(kit.price, 2)}
								</span>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}