import { create } from "zustand";
import { DEFAULT_CLASS_SECTIONS, DEFAULT_CLASS_SESSIONS } from "../constants/constants";
import { ClassSectionType, ClassSessionType } from "../types/types";
import { useEffect } from "react";


interface ITestStore {
    property: ClassSessionType,
    update: (property?: ClassSessionType) => void
}


// export const useTest = () => {
//     const state = create<ITestStore>((set)=>({
//         property: DEFAULT_CLASS_SECTIONS,
//         update: ()=> set((state)=>({property:state.property}))
//     }))

//     useEffect(()=>{
//         state().update();
//     },[state().property])

//     return state().property;
// }

export const useTestStore = create<ITestStore>((set) => ({
    property: DEFAULT_CLASS_SESSIONS,
    update: (x?) => set((x != undefined) ? { property: x } : (state) => ({ property: state.property }))
    // update: () => set((state) => ({ property: state.property }))
}))

// export const useTest = ()=>{
//     const Proper = useTestStore();

//     useEffect(()=>{
//         Proper.update();
//         console.log("changed");
//     },[Proper.property]);

//     return Proper.property;
// }