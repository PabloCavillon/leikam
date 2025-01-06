'use client'

import { useEffect, useState } from "react";
import { useKitsStore } from "@/store";
import { getAllKits } from "@/actions";

export default function PromocionalKitsPage() {
  
	const kitsList = useKitsStore((state) => state.kitsList);
	const loadKitsList = useKitsStore((state) => state.loadKitsList);
	const [isLoading, setIsLoading] = useState<boolean>(false);

  	useEffect(() => {
		const fetchKits = async () => {
			try {
				const kits = await getAllKits();
				loadKitsList(kits);
			} catch (error) {
				console.log(error);
			}
			setIsLoading(true);
		}
		fetchKits();
	}, []);

  
	if (!isLoading) 
		return <div>Loading...</div>

	return (
		<div className="space-y-6">
		{
			kitsList.map((kit) => (<></>))
		}
		</div>
	);
}