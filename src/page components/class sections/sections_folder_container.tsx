
import { CurrentSemester } from "../../types/types";
import SectionsFolderSubjects from "./sections_folder_subjects";
import { useSectionStore } from "../../stores/section_store";
import Button from "../../components/button";

import { useUIStore } from "../../stores/ui_store";


export default function SectionsFolderContainer() {
    const ui_state = useUIStore();
    const class_section = useSectionStore();
    const selected_year = class_section.get.year_active;
    const selected_sem = class_section.get.sem_active;
    const data = class_section.get.data.filter((arr: CurrentSemester) => (arr.year == selected_year && arr.semester == selected_sem));


    const ToggleModal = () => {
        let new_ui_state = ui_state.get;
        new_ui_state.modal = "sections";
        ui_state.set(new_ui_state);
    }
    return (
        <div className="w-full bg-neutral-100 min-h-64 relative h-max rounded-tl-none rounded-lg border border-t-0 border-neutral-300 ">
            <div className="w-full absolute rounded-tl-none rounded-lg h-5 top-[-1px] border-neutral-300 border-t-[1px]"></div>
            <div className="p-2 size-max w-full flex flex-col items-start justify-between h-full z-10">
                <Button text="Create New" onClick={ToggleModal} />

                {data.map((e, i) => {

                    return (e != undefined) ?
                        (
                            <div key={i} className="bg-neutral-200/50 h-auto w-[calc(100%-0.5rem)]  rounded-md p-1 m-1 border border-neutral-300" >
                                <p>{e.course}</p>
                                <SectionsFolderSubjects subjects={e.subjects} />
                            </div>
                        ) :
                        (<></>)
                })
                }



            </div>
        </div>
    )
}