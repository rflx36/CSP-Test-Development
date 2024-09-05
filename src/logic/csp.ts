import { ICSP, IPendingSubsequentSubjectDayInterval, TimeAllocationBufferType } from "../types/csp_types";
import { CourseType, Subject, SubjectHasLabLec, TimeType, WeekType, YearType } from "../types/types";
import CheckInputsEligibility from "./check_inputs_eligibility";
import CheckAvailability from "./csp utils/check_availability";
import { ConvertHourToValue, ConvertTimeToValue, ConvertValueToTime } from "./time utils/time_converter";
import { AddTime, GetPrecedingDay } from "./time utils/time_modifier";





export default function CSP(inputs: ICSP) {

    if (!CheckInputsEligibility(inputs)) {
        console.log("canncelled");
        return;
    }


    const subsequent_subject_day_interval = 3;
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
    let current_subjects_load: Array<IPendingSubsequentSubjectDayInterval>;
    // let current_subjects_load: Array<Subject | SubjectHasLabLec>; // for the second part of the subject within a week (partitionable:true)
    // let current_subjects_load_await: Array<WeekType>;

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
    const CheckAndPushSubjectsAvailability = (current: Subject, section_name: string, is_subsequent: boolean) => {

        const current_is_partitionable = current.is_dividable;
        const current_allocation = ConvertHourToValue((current_is_partitionable) ? (current.total_hours / 2) : current.total_hours);

        current_time_start = inputs.time_start;
        current_time_end = AddTime(inputs.time_start, current_allocation);


        
        let check_availability_room = CheckAvailability(rooms, current_room, current_time_start, current_time_end, current_day);
        let check_availability_instructor = CheckAvailability(instructor, current_instructor, current_time_start, current_time_end, current_day);
        let limit = 0;
        while (check_availability_room || check_availability_instructor) {
            if (limit >= 10000) {
                console.log("max loop reached");
                break;

            }
            current_time_start = AddTime(current_time_start, 30);
            current_time_end = AddTime(current_time_end, 30);
            const current_time_start_value = ConvertTimeToValue(current_time_start);
            const current_time_end_value = ConvertTimeToValue(current_time_end);

            //skips the proposed time_start and time_end if it overlaps in break time
            if ((current_time_start_value >= break_time_start && current_time_start_value < break_time_end) ||
                (current_time_end_value >= break_time_end && current_time_end_value < break_time_end)) {
                continue;
            }
            else if ((current_time_start_value < break_time_start && current_time_end_value >= break_time_start)) {
                continue;
            }

            check_availability_room = CheckAvailability(rooms, current_room, current_time_start, current_time_end, current_day);
            check_availability_instructor = CheckAvailability(instructor, current_instructor, current_time_start, current_time_end, current_day);

            if (current_time_end_value > ConvertTimeToValue(inputs.time_end)) {
                current_time_start = inputs.time_start;
                current_time_end = AddTime(inputs.time_start, current_allocation);
                current_day = GetPrecedingDay(current_day, 1);
            }
        }
        console.log(current_course.code + "" + section_name + "[" + current.code + "]" + current_time_start + "-" + current_time_end + ":" + current_day + " Available" + " Room[" + inputs.rooms[current_room] + "] Allocation:" + current_allocation);
        //here
        ///check if prof available
        if (current_is_partitionable && !is_subsequent) {
            const set_subsequent_subject = {
                day: GetPrecedingDay(current_day, subsequent_subject_day_interval),
                subject: current
            }
            current_subjects_load.push(set_subsequent_subject);
        }
        const day_index = days.indexOf(current_day);
        const current_time_end_value = ConvertTimeToValue(current_time_end);
        const modified_time_end_value = ConvertValueToTime(current_time_end_value - 1);

        //add the allocation values 
        rooms.push(`${current_room};${day_index};${current_time_start}`)
        rooms.push(`${current_room};${day_index};${modified_time_end_value}`);
        instructor.push(`${current_room};${day_index};${current_time_start}`)
        instructor.push(`${current_room};${day_index};${modified_time_end_value}`)

        current_session += (current_allocation / 60) % 24;

        if (current_session > max_session) {
            current_session = 0;
        }
    }

    const SetSubsequentSubjects = (section_name: string) => {
        const available_subsequent_subjects = current_subjects_load.filter(x => x.day == current_day);
        const confirmed_subsequent_subjects: Array<IPendingSubsequentSubjectDayInterval> = [];
        
        for (let i = 0; i < available_subsequent_subjects.length; i++) {
            const current_subsequent_subject = available_subsequent_subjects[i].subject;
            const subsequent_subject_is_leclab = CheckSubjectIsLecLab(current_subsequent_subject);
            if (subsequent_subject_is_leclab) {

            }
            else {
                const current = current_subsequent_subject as Subject;
                CheckAndPushSubjectsAvailability(current, section_name, true);
                confirmed_subsequent_subjects.push(available_subsequent_subjects[i]);
            }
        }
        current_subjects_load = current_subjects_load.filter(x => !confirmed_subsequent_subjects.includes(x));
    }

    const SetSubjects = (section_name: string, iterate: number) => {
        

        const current_subject_is_leclab = CheckSubjectIsLecLab(current_subjects[iterate]);
        // set week day limit by 4 hour session

        //prioritize subsequent subjects
        const subsequent_days = current_subjects_load.map(x => x.day);
        if (subsequent_days.includes(current_day)) {
            SetSubsequentSubjects(section_name);
        }

        if (current_subject_is_leclab) {
            const current = current_subjects[iterate] as SubjectHasLabLec;

        } else {
            const current = current_subjects[iterate] as Subject;
            CheckAndPushSubjectsAvailability(current, section_name, false);

        }
       

        if (current_subjects[iterate + 1] != undefined) {
            SetSubjects(section_name, iterate + 1);
        }
        else if (current_subjects_load.length > 0) {
            SetRemainingSubsequentSubjects(section_name);

        }
    }
    const SetRemainingSubsequentSubjects = (section_name: string) => {
        let i = 0;
        while (current_subjects_load.length > 0) {
            const subsequent_days = current_subjects_load.map(x => x.day);
            if (subsequent_days.includes(current_day)) {
                SetSubsequentSubjects(section_name);
            }
            else {

                current_day = GetPrecedingDay(current_day, 1);
            }
            i++;
            if (i > 100) {
                
        console.log("LIMIT REACHED:"+i);
                break;
            }
        }
    }
    const SetSections = (sections_amount: number) => {

        for (let i = 1; i <= sections_amount; i++) {
            const section_name = (current_year + String.fromCharCode(96 + i)).toUpperCase();
            // SetRooms(section_name);
            current_day = "monday";
            current_subjects_load = [];
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
