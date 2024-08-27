
import ClassSectionsContainer from "./page components/class sections/sections_container"
import ClassSessionsContainer from "./page components/class sessions/sessions_container"
import ModalSections from "./components/modals/modal_sections"
import { useTestStore } from "./stores/test_store"
import { useSessionStore } from "./stores/session_store";
import { useUIStore } from "./stores/ui_store";
import { useSectionStore } from "./stores/section_store";
import ClassInstructorsContainer from "./page components/class instructors/instructors_container";
import ModalInstructors from "./components/modals/modal_instructors";
import { useInstructorStore } from "./stores/instructor_store";
import GenerateSeedContainer from "./page components/class generate/generate_seed";
import GenerateTimeSlots from "./logic/time_utils/time_modifier";
import CSP from "./logic/csp";
import CheckAvailability from "./logic/csp utils/check_availability";
import { TimeAllocationBufferType } from "./types/csp_types";




function App() {
  const test = useTestStore();
  const session = useSessionStore();
  const section = useSectionStore();
  const ui_state = useUIStore();
  const instructors = useInstructorStore();

  const update = () => {
    // let other = test.property;
    // other.time_end = "00:01";
    // test.update(other);
    let other = test.property;
    test.property.time_end = "00:02";
    other.time_end = "00:01";

    test.update(test.property);
  }

  const print = () => {

    const data = {
      session: session.get,
      section: section.get.data,
      ui_state: ui_state.get,
      instructors: instructors.get.instructors
    }

    console.log(data);

    const dat = {
      instructors: instructors.get.instructors,
      data: section.get.data,
      time_start: session.get.time_start,
      time_end: session.get.time_end,
      break_time_start: session.get.break_time_start,
      break_time_end: session.get.break_time_end,
      courses: session.get.courses,
      rooms: session.get.rooms
    }
    CSP(dat);
    const arr: Array<TimeAllocationBufferType> = ["0;0;01:01","0;0;02:05","0;0;01:59","0;0;05:20"];
    // TestCheckAvailability(arr,0,"03:00","04:00","monday");
    
    console.log(CheckAvailability(arr,0,"03:00","04:00","monday"));
  }

  // const course_options = session.get.courses.map((e) => ({ label: e.code, value: e.name }));
  // const [value, setValue] = useState<typeof course_options[0] | undefined>(course_options[0]);

  // const test_arr = [12, 45, 78, 23, 56, 89, 34, 67, 90, 11];

  // const [rng, setRng] = useState(0);
  // const current_arr = RandomizeArray(test_arr,rng).filter(item => item !== undefined && item !== null && item !== '');
  // console.log(current_arr);

  //   const []
  //   console.log(rng);
  // //1679615
  //   const max = 1679615;
  //   const 
  console.log(GenerateTimeSlots("02:00", "04:30"));
  return (
    <>
      <button onClick={print}>print</button>
      {/* <input maxLength={4} type="text" value={SeedConvert(rng).toString().toLocaleUpperCase()} onBlur={x => setRng(SeedConvert(x.currentTarget.valueAsNumber) as number)} /> */}

      {/* <Select options={course_options} value={value} onChange={x => setValue(x)} /> */}
      {/* <Sidebar /> */}

      <div className="grid  place-content-center h-[100vh] bg-neutral-100">
        <button onClick={update}>{test.property.time_end}</button>
        <div className="gap-2 flex flex-col">
          <GenerateSeedContainer />
          <ClassSessionsContainer />
          <ClassSectionsContainer />
          <ClassInstructorsContainer />
          <ModalSections />
          <ModalInstructors />
        </div>
      </div>
    </>
  )
}




export default App
