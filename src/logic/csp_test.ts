import { ICSP, TimeAllocationBufferType } from "../types/csp_types";
import { CourseType, CurrentSemester, InstructorType, Subject, SubjectHasLabLec, TimeType, WeekType, YearType } from "../types/types";
import ArraysMatch from "./array_match";
import CheckAvailability from "./csp utils/check_availability";
import CheckSubjectIsLecLab from "./csp utils/check_subject_type";
import { ConvertHourToValue, ConvertTimeToValue, ConvertValueToTime } from "./time utils/time_converter";
import { AddTime, GetPrecedingDay } from "./time utils/time_modifier";


export default class SchedulingCSP {

    public days: Array<WeekType> = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
    public subsequent_subject_day_interval = 3;
    public max_session = 5;

    //inputs
    private instructors: Array<InstructorType> = [];
    private data: Array<CurrentSemester> = [];
    private time_start: TimeType = "00:00";
    private time_end: TimeType = "00:00";
    private break_time_start: number = 0;
    private break_time_end: number = 0;
    private courses: Array<CourseType> = [];
    private rooms: Array<string> = [];

    private rooms_allocation: Array<TimeAllocationBufferType> = [];
    private instructors_allocation: Array<TimeAllocationBufferType> = [];

    private current_room: number = 0;
    private current_room_lab: number = this.rooms.length;
    private current_time_start: TimeType = "00:00";
    private current_time_end: TimeType = "00:00";
    private current_instructor: number = 0;
    private current_subjects: Array<Subject | SubjectHasLabLec> = [];
    private current_subject: Subject = { title: "", code: "", total_hours: 0, is_dividable: false };
    private current_session: number = 0;
    private current_section: string = "";
    private current_course: CourseType = { name: "", code: "" };
    private current_year: YearType = 1;
    private current_day: WeekType = "monday";
    private current_subsequent_day: WeekType = "monday";
    private current_is_partitionable: boolean = false;
    constructor(inputs: ICSP) {
        this.data = inputs.data;
        this.instructors = inputs.instructors;
        this.courses = inputs.courses;
        this.rooms = inputs.rooms;
        this.time_start = inputs.time_start;
        this.time_end = inputs.time_end;
        this.break_time_start = ConvertTimeToValue(inputs.break_time_start);
        this.break_time_end = ConvertTimeToValue(inputs.break_time_end);
    }

    //performs the backtrack
    private RemoveSubjectsAllocation() {
        this.rooms_allocation.pop();
        this.rooms_allocation.pop();
        this.instructors_allocation.pop();
        this.instructors_allocation.pop();
    }
    private AddSubjectsAllocation() {
        const day_index = this.days.indexOf(this.current_day);
        const current_time_end_value = ConvertTimeToValue(this.current_time_end);
        const modified_time_end_value = ConvertValueToTime(current_time_end_value - 1);

        console.log(this.current_course.code + ":" + this.current_section + "[" + this.current_subject.code + "]" + this.current_time_start + "-" + this.current_time_end + ":" + this.current_day + " Available" + " Room[" + this.rooms[this.current_room] + "]");
        this.rooms_allocation.push(`${this.current_room};${day_index};${this.current_time_start}`)
        this.rooms_allocation.push(`${this.current_room};${day_index};${modified_time_end_value}`);
        this.instructors_allocation.push(`${this.current_room};${day_index};${this.current_time_start}`)
        this.instructors_allocation.push(`${this.current_room};${day_index};${modified_time_end_value}`)
        if (this.current_is_partitionable) {
            const subsequent_day_index = this.days.indexOf(this.current_subsequent_day);
            this.rooms_allocation.push(`${this.current_room};${subsequent_day_index};${this.current_time_start}`)
            this.rooms_allocation.push(`${this.current_room};${subsequent_day_index};${modified_time_end_value}`);
            this.instructors_allocation.push(`${this.current_room};${subsequent_day_index};${this.current_time_start}`)
            this.instructors_allocation.push(`${this.current_room};${subsequent_day_index};${modified_time_end_value}`)
            console.log(this.current_course.code + ":" + this.current_section + "[" + this.current_subject.code + "]" + this.current_time_start + "-" + this.current_time_end + ":" + this.current_subsequent_day + " Available" + " Room[" + this.rooms[this.current_room] + "]");

        }
        // current_session += (current_allocation / 60) % 24;
        // if (current_session > max_session) {
        //     current_session = 0;
        // }

    }
    private VerifyTotalAvailability() {
        //checks availability with the proposed time_start and time_end

        const check_availability_room = CheckAvailability(this.rooms_allocation, this.current_room, this.current_time_start, this.current_time_end, this.current_day);
        const check_availability_instructor = CheckAvailability(this.instructors_allocation, this.current_instructor, this.current_time_start, this.current_time_end, this.current_day);

        if (this.current_is_partitionable) {
            //if partitionable also checks for the subsequent schedule 

            const check_availability_subsequent_room = CheckAvailability(this.rooms_allocation, this.current_room, this.current_time_start, this.current_time_end, this.current_subsequent_day);
            const check_availability_subsequent_instructor = CheckAvailability(this.instructors_allocation, this.current_instructor, this.current_time_start, this.current_time_end, this.current_subsequent_day);
            return (check_availability_room || check_availability_instructor || check_availability_subsequent_room || check_availability_subsequent_instructor)
        }
        else {
            return (check_availability_room || check_availability_instructor);
        }

    }
    private CheckSubjectsAvailability() {
        this.current_is_partitionable = this.current_subject.is_dividable;
        const current_allocation = ConvertHourToValue((this.current_is_partitionable) ? (this.current_subject.total_hours / 2) : this.current_subject.total_hours);

        this.current_time_start = this.time_start;
        this.current_time_end = AddTime(this.time_start, current_allocation);

        this.current_subsequent_day = GetPrecedingDay(this.current_day, this.subsequent_subject_day_interval);

        let limit = 0;
        let week_allocation_buffer: Array<WeekType> = [];

        let is_not_available = true;
        while (is_not_available) {
            limit++;
            if (limit >= 10000) {
                console.log("max loop reached");
                return false;

            }

            this.current_time_start = AddTime(this.current_time_start, 30);
            this.current_time_end = AddTime(this.current_time_end, 30);


            const current_time_start_value = ConvertTimeToValue(this.current_time_start);
            const current_time_end_value = ConvertTimeToValue(this.current_time_end);




            //skips the proposed time_start and time_end if it overlaps in break time
            if ((current_time_start_value >= this.break_time_start && current_time_start_value < this.break_time_end) ||
                (current_time_end_value >= this.break_time_end && current_time_end_value < this.break_time_end)) {

                continue;
            }
            else if (current_time_start_value < this.break_time_start && current_time_end_value >= this.break_time_start) {
                continue;
            }

            is_not_available = this.VerifyTotalAvailability();
            //skips the proposed time_start and time_end if it goes beyond time end of the day and proceeds to the next following day
            if (current_time_end_value > ConvertTimeToValue(this.time_end)) {
                this.current_time_start = this.time_start;
                this.current_time_end = AddTime(this.time_start, current_allocation);
                week_allocation_buffer.push(this.current_day);
                this.current_day = GetPrecedingDay(this.current_day, 1);
                this.current_subsequent_day = GetPrecedingDay(this.current_day, this.subsequent_subject_day_interval);

                if (ArraysMatch(week_allocation_buffer, this.days)) {
                    //switch / no available slots
                    console.log("no available slots");
                    // return false;
                    console.log(this.current_subject);
                }
                continue;
            }
        }
        return true;
    }

    private SetSubjects(iterate: number) {
        const current_subject_is_leclab = CheckSubjectIsLecLab(this.current_subjects[iterate]);
        if (current_subject_is_leclab) {
            const current = this.current_subjects[iterate] as SubjectHasLabLec;
            // const temp_room = this.current_room;
            // this.current_room = this.current_room_lab;
            const current_lab: Subject = {
                title: current.title,
                code: current.code,
                total_hours: current.lab_total_hours,
                is_dividable: current.lab_is_dividable
            }
            const current_lec: Subject = {
                ...current_lab,
                total_hours: current.lec_total_hours,
                is_dividable: current.lec_is_dividable
            }

            this.current_subject = current_lec;
            if (!this.CheckSubjectsAvailability()) {

                // this.current_room = temp_room
                return false;
            }
            this.AddSubjectsAllocation();
            // this.current_room = temp_room
            this.current_subject = current_lab;

            if (!this.CheckSubjectsAvailability()) {

                console.log("backtracked");
                return false;
            }
            this.AddSubjectsAllocation();

        }
        else {
            const current = this.current_subjects[iterate] as Subject;
            this.current_subject = current;
            if (!this.CheckSubjectsAvailability()) {

                console.log("backtracked");
                return false;

            }
            this.AddSubjectsAllocation();
        }

        if (this.current_subjects[iterate + 1] != undefined) {
            if (!this.SetSubjects(iterate + 1)) {

                console.log("backtracked");
                return false;
            }
        }
        return true;
    }

    private SetSections(sections_amount: number) {
        for (let i = 1; i <= sections_amount; i++) {
            const section_name = (this.current_year + String.fromCharCode(96 + i)).toUpperCase();
            // SetRooms(section_name);
            this.current_day = "monday";
            this.current_session = 0;
            this.current_section = section_name;
            // current_room = inputs.rooms[0]

            if (!this.SetSubjects(0)) {

                console.log("backtracked");
                return false;
            }
        }
        return true;
    }
    public Solve() {
        for (let i = 0; i < this.courses.length; i++) {
            this.current_course = this.courses[i];
            for (let year = 1; year <= 4; year++) {
                this.current_year = year as YearType;
                const current = this.data.find(x => x.year == this.current_year && x.course == this.current_course.code);
                if (current == undefined) {
                    continue;
                }
                this.current_subjects = current.subjects;
                if (!this.SetSections(current.sections)) {
                    return false;
                }
            }
        }
        console.log(this.rooms_allocation);
        return true;
    }

}

