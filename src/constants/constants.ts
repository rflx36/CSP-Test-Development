import { ClassSectionType, ClassSessionType, UIStateType } from "../types/types"

export const DEFAULT_CLASS_SESSIONS: ClassSessionType = {
    time_start: "07:00",
    time_end: "21:00",
    courses: [],
    rooms: []
}

export const DEFAULT_CLASS_SECTIONS: ClassSectionType = {
    year_active: 1,
    sem_active: "1st",
    course_active: "",
    data: []
}

export const DEFAULT_UI_STATE: UIStateType = {
    modal: "sections",
    sidebar_is_active: true,
    sidebar_active: "scheduler",
    sidebar_active_children: "time"
}