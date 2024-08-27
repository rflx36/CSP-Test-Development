import { ICSP, IInstructorAllocation, IRoomAllocation, TimeAllocationBufferType } from "../types/csp_types";
import { CourseType, CurrentSemester, InstructorType, Subject, SubjectHasLabLec, TimeType, WeekType, YearType } from "../types/types";
import CheckAvailability from "./csp utils/check_availability";
import CheckInstructorSessionAvailability from "./csp utils/check_availability_instructor";
import CheckRoomSessionAvailability from "./csp utils/check_availability_room";
import { ConvertHourToValue, ConvertTimeToValue, ConvertValueToTime } from "./time_utils/time_converter";
import GenerateTimeSlots, { AddTime, GetPrecedingDay } from "./time_utils/time_modifier";





export default function CSP(inputs: ICSP) {
    const day_gap = 2;
    const max_session = 5;
    // let rooms: Array<IRoomAllocation> = [];
    // let instructors: Array<IInstructorAllocation> = [];
    let rooms: Array<TimeAllocationBufferType> = [];
    let instructor: Array<TimeAllocationBufferType> = [];
    const days: Array<WeekType> = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
    const break_time_start = ConvertTimeToValue(inputs.break_time_start);
    const break_time_end = ConvertTimeToValue(inputs.break_time_end);
    let current_room: number = 0;
    let current_instructor: number = 0;
    let current_course: CourseType;
    let current_year: YearType;
    let current_subjects: Array<Subject | SubjectHasLabLec>;
    let current_subjects_load: Array<Subject | SubjectHasLabLec>; // for the second part of the subject within a week (partitionable:true)
    let current_subjects_load_await: Array<WeekType>;

    // let current_instructor: InstructorType;
    let current_day: WeekType;
    let current_session: number;
    let current_section: string;
    let current_time_start: TimeType;
    let current_time_end: TimeType;

    const CheckSubjectIsLecLab = (s: Subject | SubjectHasLabLec) => {
        return ((s as Subject).total_hours == undefined);
    }



    // const SetInstructor = (time_start: TimeType, time_end: TimeType) => {
    //     for (let i = 0; i < inputs.instructors.length; i++) {
    //         current_instructor = inputs.instructors[i];
    //         // if (CheckInstructorSessionAvailability)
    //     }
    // }

    const SetRoomsLab = () => {

    }
    // const SetRooms = (section_name: string) => {
    //     // let validity = false;
    //     // let time_start = inputs.time_start;
    //     // let i = 0;
    //     // while (!validity) {
    //     //     validity = CheckRoomSessionAvailability(inputs.rooms[i], time_start);
    //     //     time_start = AddTime(time_start);
    //     //     if (time_start == "24:00") {
    //     //         i++;
    //     //     }
    //     // }
    //     let set_time_start = inputs.time_start;
    //     // for (let i = 0 ; i < rooms.length; i++){
    //     //     if (CheckRoomSessionAvailability(inputs.rooms[i],set_time_start)){
    //     //         break;
    //     //     }
    //     //     while()
    //     // }
    //     let i = 0;
    //     const current_subject_is_leclab = CheckSubjectIsLecLab(current_subjects[0]);
    //     const current_subject_allocation = (current_subject_is_leclab) ? current_subjects[0] as Subject : current_subjects[0] as SubjectHasLabLec;

    //     while (i < rooms.length) {
    //         if (CheckRoomSessionAvailability(inputs.rooms[i], set_time_start) &&
    //             CheckRoomSessionAvailability(inputs.rooms[i], AddTime(set_time_start,))) {
    //             break;
    //         }
    //         if (set_time_start == inputs.time_end) { //if reaches the end set to starting again and switch to next available room
    //             set_time_start = inputs.time_start;
    //             i++;
    //         }
    //         set_time_start = AddTime(set_time_start);
    //     }

    //     // rooms.push({ room: inputs.rooms[i], time_allocated })
    //     console.log(current_course.code + ":" + section_name);
    // }

    //recursive check


    const SetSubjects = (section_name: string, iterate: number) => {
        // if (current_subjects_load_await[0])

        const current_subject_is_leclab = CheckSubjectIsLecLab(current_subjects[iterate]);
        // set week day limit by 4 hour session

        if (current_subject_is_leclab) {
            const current = current_subjects[iterate] as SubjectHasLabLec;

        } else {
            const current = current_subjects[iterate] as Subject;
            const current_is_partitionable = current.is_dividable;
            const current_allocation = ConvertHourToValue((current_is_partitionable) ? (current.total_hours / 2) : current.total_hours);


            current_time_start = inputs.time_start;
            current_time_end = AddTime(inputs.time_start, current_allocation);
            // let check_availability_room = CheckRoomSessionAvailability(rooms, current_room, current_time_start, current_time_end, current_day);
            // let check_availability_instructor = CheckInstructorSessionAvailability(instructors, current_instructor, current_time_start, current_time_end, current_day);
            let check_availability_room = CheckAvailability(rooms, current_room, current_time_start, current_time_end, current_day);
            let check_availability_instructor = CheckAvailability(instructor, current_instructor, current_time_start, current_time_end, current_day);

            let limit = 0;
            while (check_availability_room || check_availability_instructor) {

                // current_time_start = current_time_start;
                // current_time_end = AddTime(current_time_start, current_allocation);

                if (limit >= 10000) {
                    console.log("max loop reached");
                    break;

                }

                current_time_start = AddTime(current_time_start, 30);
                current_time_end = AddTime(current_time_end, 30);


                const current_time_start_value = ConvertTimeToValue(current_time_start);
                const current_time_end_value = ConvertTimeToValue(current_time_end);

                if ((current_time_start_value >= break_time_start && current_time_start_value < break_time_end) ||
                    (current_time_end_value >= break_time_end && current_time_end_value < break_time_end)) {
                    console.log("overlapped in break time adjusting ["+current_time_start+"-"+current_time_end+"]");
                    continue;

                }

                check_availability_room = CheckAvailability(rooms, current_room, current_time_start, current_time_end, current_day);
                check_availability_instructor = CheckAvailability(instructor, current_instructor, current_time_start, current_time_end, current_day);

                // console.log("getting:"+current_time_start);
                // check_availability_room = CheckRoomSessionAvailability(rooms, current_room, current_time_start, current_time_end, current_day);
                // check_availability_instructor = CheckInstructorSessionAvailability(instructors, current_instructor, current_time_start, current_time_end, current_day);
                if (current_time_end_value > ConvertTimeToValue(inputs.time_end)) {
                    current_time_start = inputs.time_start;
                    current_time_end = AddTime(inputs.time_start, current_allocation);
                    current_day = GetPrecedingDay(current_day, 1);
                }
            }
            console.log(current_course.code + "" + section_name + "[" + current.code + "]" + current_time_start + "-" + current_time_end + ":" + current_day + " Available" + " Room[" + inputs.rooms[current_room] + "] Allocation:" + current_allocation);
            //here
            ///check if prof available
            if (current_is_partitionable) {
                current_subjects_load.push(current);
            }
            const day_index = days.indexOf(current_day);
            const current_time_end_value = ConvertTimeToValue(current_time_end);
            const modified_time_end_value = ConvertValueToTime(current_time_end_value - 1);

            rooms.push(`${current_room};${day_index};${current_time_start}`)
            rooms.push(`${current_room};${day_index};${modified_time_end_value}`);
            //add the allocation values 
            instructor.push(`${current_room};${day_index};${current_time_start}`)
            instructor.push(`${current_room};${day_index};${modified_time_end_value}`)

            current_session += (current_allocation / 60) % 24;

            if (current_session > max_session) {
                current_session = 0;
                current_day = GetPrecedingDay(current_day, 1);
            }
            console.log("current:" + current_session);
            // const time_allocated = GenerateTimeSlots(current_time_start, current_time_end);
            // const selected_room = rooms.find(x => x.room == current_room);
            // const selected_room_index = rooms.findIndex(x => x.room == current_room);
            // const room_schedules_allocated_info = {
            //     time: time_allocated,
            //     day: current_day
            // }
            // if (selected_room == undefined) {
            //     const temp = [];
            //     temp.push(room_schedules_allocated_info);
            //     rooms.push({ room: current_room, schedule: temp });
            // }
            // else if (selected_room!.schedule.find(x => x.day == current_day) == undefined) {
            //     const temp = [];
            //     temp.push(room_schedules_allocated_info);

            //     rooms[selected_room_index] = { room: current_room, schedule: temp };
            // }
            // else {
            //     selected_room!.schedule.find(x => x.day == current_day)?.time.push(...time_allocated);

            //     rooms[selected_room_index] = { room: current_room, schedule: selected_room.schedule };


            // }

            // console.log(current_course.code + ":" + section_name + ":" + current_allocation);
        }
        if (current_subjects[iterate + 1] != undefined) {
            SetSubjects(section_name, iterate + 1);
        }
        else {


        }

    }

    const SetSections = (sections_amount: number) => {

        for (let i = 1; i <= sections_amount; i++) {
            const section_name = (current_year + String.fromCharCode(96 + i)).toUpperCase();
            // SetRooms(section_name);
            current_day = "monday";
            current_subjects_load = [];
            current_subjects_load_await = [];
            current_session = 0;

            // current_room = inputs.rooms[0]

            SetSubjects(section_name, 0);

        }
    }

    for (let i = 0; i < inputs.courses.length; i++) {
        current_course = inputs.courses[i];
        for (let j = 1; j <= 4; j++) {
            current_year = j as YearType;
            const current = inputs.data.find(x => x.year == current_year && x.course == current_course.code);
            if (current == undefined) {
                continue;
            }
            current_subjects = current!.subjects;

            SetSections(current!.sections);
        }
    }

    console.log(rooms);


    // select first course
    // select current list of year
    // select current list of section
    // select current list of subject


    // select room
    // select timeframe
    // select instructor

    // select current list of room
    // check if current time of the room is allocated 
    // if not adjust time to the next by 30mins (recursive)
    // set current list of subject time_start (setted time_start)
    // set current list of 1st subject time_end 
    // time_end = time_start + hours allocated (divide by 2 if partitionable)
    // set which weektype
    // assign prof to current subject
    // priority prof preffered current subject
    // check if prof availability exist in current time frame / current week day
    // if prof is not available: 
    // change weektype to next 
    // adjust time to the next (recursive check if time is allocated in the current room)
    // finish 
    // start the next increment / recursion



}
