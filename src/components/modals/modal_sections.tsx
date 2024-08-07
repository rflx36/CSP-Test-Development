import { useState } from "react"
import ModalContainer from "./modal_container"
import { Subject, SubjectHasLabLec, YearType } from "../../types/types";
import { useSectionStore } from "../../stores/section_store";
import Checkbox from "../checkbox";
import Button from "../button";
import Chip from "../chip";


export default function ModalSections() {
    const sections = useSectionStore();

    const [subjectTitle, setSubjectTitle] = useState("");
    const [subjectCode, setSubjectCode] = useState("");
    const [lecLab, setLecLab] = useState(false);
    const [baseHours, setBaseHours] = useState(1);
    const [basePartitionable, setBasePartitionable] = useState(true);

    const [lecHours, setLecHours] = useState(2);
    const [lecPartitionable, setLecPartitionable] = useState(true);
    const [labHours, setLabHours] = useState(3);
    const [labPartitionable, setLabPartitionable] = useState(false);

    const sections_data = sections.get;

    const selected_course = sections_data.course_active
    const selected_year = sections_data.year_active;
    const selected_sem = sections_data.sem_active;

    const [subjects, setSubjects] = useState<Array<Subject | SubjectHasLabLec>>([]);

    const AddSubject = () => {

        if (lecLab) {
            const subject_data = {
                title: subjectTitle,
                code: subjectCode,
                lab_total_hours: labHours,
                lab_is_dividable: labPartitionable,
                lec_total_hours: lecHours,
                lec_is_dividable: lecPartitionable
            }
            setSubjects(x => [...x, subject_data]);
        }
        else {
            const subject_data = {
                title: subjectTitle,
                code: subjectCode,
                total_hours: baseHours,
                is_dividable: basePartitionable
            }
            setSubjects(x => [...x, subject_data]);
        }
        setSubjectTitle("");
        setSubjectCode("");


    }

    const Proceed = () => {
        setSubjectTitle("");
        setSubjectCode("");
        const current_data = sections.get.data;

        const similar_data_index = current_data.findIndex(e => e.course == selected_course && e.semester == selected_sem && e.year == sections!.get.year_active)

        if (similar_data_index != -1) {
            current_data[similar_data_index] = { ...current_data[similar_data_index], subjects: subjects };

            console.log("Modified");
        }
        else {
            current_data.push({
                semester: selected_sem,
                year: sections!.get.year_active,
                subjects: subjects,
                course: selected_course,
                sections: 1
            })
            console.log("Added");
        }
        console.log(sections);

        let new_sections = sections.get;
        new_sections.data = current_data;
        sections.set(new_sections);
        setSubjects([]);
    }

    const is_eligible_to_add_subject = (subjectCode.trim() !== '' && subjectTitle.trim() !== '' && ((!lecLab) ? (!isNaN(baseHours)) : (!isNaN(lecHours) && !isNaN(labHours))));

    return (
        <ModalContainer >
            <div className=" font-manrope-semibold text-sm mb-1 text-neutral-500">
                <p>{selected_course} {YearTextDecoder(selected_year)} {selected_sem} Sem</p>
            </div>
            <div className=" drop-shadow-sm border-neutral-300 mt-4 border rounded-md w-auto h-max p-4 pb-3">
                <div className="flex gap-2 mb-2">

                    <div className="flex flex-col">
                        <label className="font-manrope-semibold text-sm mb-1" >Subject Code</label>
                        <input
                            required
                            type="text"
                            value={subjectCode}
                            className="h-9 font-manrope-regular   px-3 py-[4px] max-w-36 tabular-nums outline-1 focus:outline-2 focus:outline-neutral-400 outline  rounded-[4px] outline-neutral-300 bg-neutral-200/50 "
                            onChange={x => setSubjectCode(x.currentTarget.value)}
                        />
                    </div>
                    <div className="flex-grow flex flex-col">
                        <label className="font-manrope-semibold text-sm mb-1" >Subject Title</label>
                        <input
                            required
                            type="text"
                            value={subjectTitle}
                            className="h-9 font-manrope-regular  min-w-64 px-3 py-[4px] tabular-nums outline-1 focus:outline-2 focus:outline-neutral-400 outline  rounded-[4px] outline-neutral-300 bg-neutral-200/50 "
                            onChange={x => setSubjectTitle(x.currentTarget.value)}
                        />
                    </div>
                </div>

                <Checkbox name="As lectures and lab sessions" default={lecLab} onChange={x => setLecLab(x)} textStyle="italic" />
                <hr className="my-4" ></hr>

                {
                    (!lecLab) ?
                        (
                            <div className="flex flex-col gap-2">
                                <div className="flex flex-col w-[50%]">
                                    <label className="font-manrope-semibold text-sm mb-1" >Hours Allocated (Weekly)</label>
                                    <input
                                        required
                                        type="number"
                                        min={1}
                                        value={baseHours}
                                        className="h-9 max-w-48  font-manrope-regular px-3 py-[4px] tabular-nums outline-1 focus:outline-2 focus:outline-neutral-400 outline  rounded-[4px] outline-neutral-300 bg-neutral-200/50 "
                                        onChange={x => setBaseHours(x.currentTarget.valueAsNumber)}
                                    />
                                </div>

                                <Checkbox name="Is Partitionable" default={basePartitionable} onChange={x => setBasePartitionable(x)} textStyle="base" />
                            </div>
                        ) : (
                            <div className="flex justify-between">
                                <div className="w-auto  flex flex-col gap-2 relative">

                                    <p className="absolute text-sm top-[-15px] italic opacity-50" >Lectures</p>
                                    <div className="flex flex-col">
                                        <label className="font-manrope-semibold text-sm mb-1" >Hours Allocated (Weekly)</label>
                                        <input
                                            required
                                            type="number"
                                            min={1}
                                            value={lecHours}
                                            className="h-9 max-w-48 font-manrope-regular px-3 py-[4px] tabular-nums outline-1 focus:outline-2 focus:outline-neutral-400 outline  rounded-[4px] outline-neutral-300 bg-neutral-200/50 "
                                            onChange={x => setLecHours(x.currentTarget.valueAsNumber)}
                                        />
                                    </div>

                                    <Checkbox name="Is Partitionable" default={lecPartitionable} onChange={x => setLecPartitionable(x)} textStyle="base" />
                                </div>
                                <div className="w-auto flex flex-col gap-2 relative">

                                    <p className="absolute text-sm top-[-15px] italic opacity-50" >Labaratory</p>

                                    <div className="flex flex-col">
                                        <label className="font-manrope-semibold text-sm mb-1" >Hours Allocated (Weekly)</label>
                                        <input
                                            required
                                            type="number"
                                            min={1}
                                            value={labHours}
                                            className="h-9 max-w-48 font-manrope-regular px-3 py-[4px] tabular-nums outline-1 focus:outline-2 focus:outline-neutral-400 outline  rounded-[4px] outline-neutral-300 bg-neutral-200/50 "
                                            onChange={x => setLabHours(x.currentTarget.valueAsNumber)}
                                        />
                                    </div>

                                    <Checkbox name="Is Partitionable" default={labPartitionable} onChange={x => setLabPartitionable(x)} textStyle="base" />
                                </div>
                            </div>
                        )
                }

                <hr className="my-4" ></hr>
                <div className="w-full flex justify-end">
                    <Button text="Add Subject" onClick={AddSubject} isDisabled={!is_eligible_to_add_subject} widthFull marginDisabled/>
                </div>
            </div>
            <div className=" font-manrope-semibold text-sm my-1 text-neutral-500">
                <p>Subjects</p>
            </div>
            <div className=" drop-shadow-sm border-neutral-300 border rounded-md w-[442px] h-max p-4 pb-3">
                <div className="min-h-20 flex flex-wrap gap-2">
                    {
                        subjects.map((e, i) => {
                            return <Chip key={i} text={e.code} title={e.title} onRemove={() => { }} />
                        })
                    }
                </div>
                <hr className="my-4"></hr>
                <div className="w-full flex justify-end">
                    <Button text="Proceed" onClick={Proceed} roundedFull isDisabled={subjects.length == 0} />
                </div>
            </div>
        </ModalContainer>
    )
}



function YearTextDecoder(n: YearType) {
    switch (n) {
        case 1:
            return "1st Year";
        case 2:
            return "2nd Year";
        case 3:
            return "3rd Year";
        case 4:
            return "4th Year";
    }
}