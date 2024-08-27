import { IInstructorAllocation } from "../../types/csp_types";
import { InstructorType, TimeType, WeekType } from "../../types/types";
import { ConvertTimeToValue } from "../time_utils/time_converter";



//check if instructor conflict in time of subject (if his session is active within the same week)
export default function CheckInstructorSessionAvailability(
    instructor_schedules: Array<IInstructorAllocation>,
    instructor: InstructorType,
    time_start: TimeType,
    time_end: TimeType,
    day: WeekType) {

    const get_instructor = instructor_schedules.find(x => x.instructor == instructor);
    
    const get_instructor_schedule = get_instructor?.schedule.find(x => x.day == day)?.time;

    if (get_instructor_schedule == undefined) {
        return true;
    }

    const time_start_value = ConvertTimeToValue(time_start);
    const time_end_value = ConvertTimeToValue(time_end);
    const exist = get_instructor_schedule.filter(x => time_start_value <= x && x < time_end_value);
                                                            
    return exist.length != 0;
    // return (get_instructor_schedule.includes(time_start) || get_instructor_schedule.includes(time_end));

}