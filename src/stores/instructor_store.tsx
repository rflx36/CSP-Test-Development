import { create } from "zustand";
import { DEFAULT_CLASS_INSTRUCTORS } from "../constants/constants";
import { MutatorInstructorType } from "../types/store_types";

export const useInstructorStore = create<MutatorInstructorType>((change) => ({
    get: DEFAULT_CLASS_INSTRUCTORS,
    set: (x?) => change((x != undefined) ? { get: x } : (state) => ({ get: state.get }))
}))
