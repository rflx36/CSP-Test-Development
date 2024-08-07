type h = "00" | '01' | '02' | '03' | '04' | '05'
    | '06' | '07' | '08' | '09' | '10' | '11' | '12'
    | '13' | '14' | '15' | '16' | '17' | '18' | '19'
    | '20' | '21' | '22' | '23' | '24';

type m = h | '25' | '26' | '27' | '28' | '29' | '30'
    | '31' | '32' | '33' | '34' | '35' | '36' | '37' | '38' | '39' | '40'
    | '41' | '42' | '43' | '44' | '45' | '46' | '47' | '48' | '49' | '50'
    | '51' | '52' | '53' | '54' | '55' | '56' | '57' | '58' | '59' | '60';


export type TimeType = `${h}:${m}`;
export type YearType = 1 | 2 | 3 | 4;
export type SemesterType = "1st" | "2nd";
export type ModalsType = "sections" | "instructors" | "closed";

export interface Subject {
    title: string,
    code: string,
    total_hours: number,
    is_dividable: boolean,
}

export interface SubjectHasLabLec {
    title: string,
    code: string,
    lab_total_hours: number,
    lab_is_dividable: boolean,
    lec_total_hours: number,
    lec_is_dividable: boolean
}

export interface CurrentSemester {
    semester: SemesterType,
    year: YearType,
    subjects: Array<Subject | SubjectHasLabLec>,
    course: string,
    sections: number
}


export interface ClassSectionType {
    year_active: YearType,
    sem_active: SemesterType,
    course_active: string,
    data: Array<CurrentSemester>
}

export interface UIStateType {
    modal: ModalsType,
    sidebar_is_active: boolean,
    sidebar_active: "dashboard" | "scheduler",
    sidebar_active_children: "time" | "rooms " | "courses " | "subjects" | "instructors"
}

export interface CourseType {
    name: string,
    code: string,
}
export interface ClassSessionType {
    time_start: TimeType,
    time_end: TimeType,
    courses: Array<CourseType>,
    rooms: Array<string>
}

