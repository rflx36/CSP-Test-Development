import { create } from "zustand";
import { DEFAULT_CLASS_SECTIONS, } from "../constants/constants";
import { MutatorSectionType } from "../types/store_types";

export const useSectionStore = create<MutatorSectionType>((change) => ({
   get: DEFAULT_CLASS_SECTIONS,
   set: (x) => change({ get: x })
}))
