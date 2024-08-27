import { CourseType, CurrentSemester, InstructorType, TimeType, WeekType, YearType } from "../types/types";

export interface ICSP {
    instructors: Array<InstructorType>,
    data: Array<CurrentSemester>
    time_start: TimeType,
    time_end: TimeType,
    courses: Array<CourseType>
    rooms: Array<string>
}


export interface ISectionTemp {
    year: YearType,
    course: string,
    section: string
}

export interface IScheduleAllocation {
    time: Array<number>,
    day: WeekType
}

export interface IRoomAllocation {
    room: string,
    schedule: Array<IScheduleAllocation>
}

export interface IInstructorAllocation {
    instructor: InstructorType,
    schedule: Array<IScheduleAllocation>
}


export type TimeAllocationStoreType = `${number};${number};${TimeType}`;