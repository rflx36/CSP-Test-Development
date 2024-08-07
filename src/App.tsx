
import ClassSectionsContainer from "./page components/class sections/sections_container"
import ClassSessionsContainer from "./page components/class sessions/sessions_container"
import ModalSections from "./components/modals/modal_sections"
import Sidebar from "./components/sidebar/container";
import { useTestStore } from "./stores/test_store"




function App() {
  const test = useTestStore();

  const update = () => {
    // let other = test.property;
    // other.time_end = "00:01";
    // test.update(other);
    let other = test.property;
    test.property.time_end = "00:02";
    other.time_end = "00:01";

    test.update(test.property);
  }
  return (
    <>
    <Sidebar/>
      <div className="grid  place-content-center h-[100vh] bg-neutral-100">
        <button onClick={update}>{test.property.time_end}</button>
        <div className="gap-2 flex flex-col">
          <ClassSessionsContainer />
          <ClassSectionsContainer />
          <ModalSections />
        </div>
      </div>
    </>
  )
}




export default App
