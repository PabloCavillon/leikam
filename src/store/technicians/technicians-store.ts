// Purpose: Define the state of the technicians store.

import { Technician } from "@/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";


interface State {
    technicianList: Technician[];
    loadTechnicianList: (technicians: Technician[]) => void;
    addTechnicianToList: (technician: Technician) => void;
    removeTechnicianToList: (technician: Technician) => void;    
    updateTechnicianToList: (technician: Technician) => void;
    getTechniciansActive: () => Technician[];
    getTechniciansInactive: () => Technician[];
    getTechnicianById: (id: string) => Technician | undefined;
}

export const useTechnicianStore = create<State> () (

    persist(
        (set, get) => ({
            technicianList: [],

            loadTechnicianList: (technicians: Technician[]) => {
                set({technicianList: technicians});
            },

            addTechnicianToList: (technician: Technician) => {
                const { technicianList } = get();
                const techncianInList = technicianList.some(
                    (t) => t.id === technician.id
                );

                if(!techncianInList)
                    set({technicianList:[...technicianList, technician]});
            },

            removeTechnicianToList: (technician: Technician) => {
                const { technicianList } = get();
                const technicianListUpdated = technicianList.filter(
                    t => t.id !== technician.id
                );

                set({technicianList: technicianListUpdated});
            },

            updateTechnicianToList: async (technician: Technician) => {
                const {technicianList} = get();
                const technicianListUpdated = await Promise.all( 
                    technicianList.map( (t) => {
                        if (t.id === technician.id)
                            return technician;
                        return t;
                    })
                );
                
                set({technicianList: technicianListUpdated});
            },

            getTechniciansActive: () => {
                const { technicianList } = get();
                const techniciansActive = technicianList.filter (
                    (t: Technician) => t.active
                )

                return techniciansActive;
            },
            
            getTechniciansInactive: () => {
                const { technicianList } = get();
                const techniciansInactive = technicianList.filter (
                    (t: Technician) => !t.active
                )

                return techniciansInactive;
            },

            getTechnicianById: (id: string) => {
                const { technicianList } = get();
                const technician = technicianList.find(
                    (t: Technician) => t.id === id
                );

                return technician;
            }

        }),
        {
            name: "tehcnician-store"
        }
    ),

)