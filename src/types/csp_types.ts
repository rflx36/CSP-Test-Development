import { CourseType, CurrentSemester, InstructorType, Subject, SubjectHasLabLec, TimeType, WeekType } from "../types/types";

export interface ICSP {
    instructors: Array<InstructorType>,
    data: Array<CurrentSemester>
    time_start: TimeType,
    time_end: TimeType,
    break_time_start: TimeType,
    break_time_end: TimeType,
    courses: Array<CourseType>
    rooms: Array<string>
}


export type TimeAllocationBufferType = `${number};${number};${TimeType}`;

export interface IPendingSubsequentSubjectDayInterval {
    day: WeekType,
    subject: Subject | SubjectHasLabLec
}