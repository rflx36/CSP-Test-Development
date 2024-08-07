import { Subject, SubjectHasLabLec } from "../../types/types";




export default function SectionsFolderSubjects(props: { subjects: Array<Subject | SubjectHasLabLec> }) {

    return (
        <div className="w-full h-max flex flex-wrap gap-2">
            {
                props.subjects.map((e, i) => {
                    return (
                        <div className="w-max px-2 py-1 rounded-full bg-neutral-200" key={i}>
                            <p>{e.code}</p>
                        </div>
                    )
                })
            }
        </div>
    )

}