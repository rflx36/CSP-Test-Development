import { IRoomAllocation } from "../../types/csp_types";
import { TimeType, WeekType } from "../../types/types";
import { ConvertTimeToValue } from "../time_utils/time_converter";


export default function CheckRoomSessionAvailability(
    room_schedules: Array<IRoomAllocation>,
    room: string,
    time_start: TimeType,
    time_end: TimeType,
    day: WeekType) {

    // instructor_schedules: Array<IInstructorAllocation>,
    // instructor: InstructorType,
    // time_start: TimeType,
    // time_end: TimeType,
    // day: WeekType) => {

    // const get_instructor = instructor_schedules.find(x => x.instructor == instructor);
    // const get_instructor_schedule = get_instructor!.schedule.find(x => x.day == day)?.time;

    // if (get_instructor_schedule == undefined){
    //     return true;
    // }

    // return (get_instructor_schedule.includes(time_start) || get_instructor_schedule.includes(time_end));

    // const get_room = room_schedules.find(x=> x.room == room);
    // const get_room_schedule = get_room!.schedule.find(x = x.day == day)?.time;

    // if (get_room_schedule == undefined){
    //     return true;
    // }

    // return (get_room_schedule.includes(time_start) || get_)

    const get_room = room_schedules.find(x => x.room == room);
    const get_room_schedule = get_room?.schedule.find(x => x.day == day)?.time;

    if (get_room_schedule == undefined) {
        return true;

    }

    const time_start_value = ConvertTimeToValue(time_start);
    const time_end_value = ConvertTimeToValue(time_end);
    const exist = get_room_schedule.filter(x => time_start_value <= x && x < time_end_value);
    
    return exist.length == 0;
    // (r: string, t: TimeType, d: WeekType) => {
    // const room_exist = rooms.find(room_allocation => room_allocation.room == r && room_allocation.day == d)?.time_allocated
    // return (room_exist !== undefined) ? !room_exist!.includes(t) : false;
    // if room doesn't exist it is available 
    // else if time doesn't exist in allocated return true otherwise false
}