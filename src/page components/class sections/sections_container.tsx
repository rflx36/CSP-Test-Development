import SectionsTab from "./sections_folder_tab";
import SectionsFolderContainer from "./sections_folder_container";
import { useSectionStore } from "../../stores/section_store";
import { YearType } from "../../types/types";







export default function ClassSectionsContainer() {

    // const [activeYear, setActiveYear] = useState(1);

    // const [isFirstSem, setIsFirstSem] = useState(true)

    // const class_section = useContext(ContextClassSection)
    const class_section = useSectionStore();
  
    const selected_year = class_section!.get.year_active;

    const ChangeYear = (n: YearType) => {
        let year = class_section.get;
        year.year_active = n;
        class_section.set(year);
    }

    return (
        <div className="w-full h-max border  shadow-inner border-white bg-neutral-200/80 rounded-lg" >
            {/* <div className="flex justify-between text-black/50 gap-2 m-2 mr-0 w-[calc(100%-1rem)] h-10 border  ">
                <ButtonSwitch name="1st Sem" value={!isFirstSem} on_click={() => setIsFirstSem(true)} />

                <ButtonSwitch name="2nd Sem" value={isFirstSem} on_click={() => setIsFirstSem(false)} />
            </div>
            <ButtonAdd on_click={() => { }} /> */}

            <div className="m-2">
                <div className=" bg-neutral-300  z-10 overflow-hidden border-b-0 rounded-t-lg w-max  font-manrope-semibold text-sm text-center ">
                    <SectionsTab isActive={1 == selected_year} year="1st" onClick={() => ChangeYear(1)} />
                    <SectionsTab isActive={2 == selected_year} year="2nd" onClick={() => ChangeYear(2)} />
                    <SectionsTab isActive={3 == selected_year} year="3rd" onClick={() => ChangeYear(3)} />
                    <SectionsTab isActive={4 == selected_year} year="4th" onClick={() => ChangeYear(4)} />
                </div>
                <SectionsFolderContainer />
            </div>
        </div>
    )
}





// function ButtonSwitch(props: { name: string, value: boolean, on_click: () => void }) {
//     return (
//         <>
//             {(props.value) ?
//                 (<button onClick={() => props.on_click()} className=" drop-shadow-sm w-[50%] border h-10 border-neutral-300 rounded-md bg-neutral-100 " >{props.name}</button>) :
//                 (<div className="animate-selectedForward text-[14px] font-manrope-semibold w-[50%] h-10 grid place-content-center border shadow-[inset_0_0_7px_2px_rgb(0,0,0,0.1)] border-neutral-100  bg-neutral-300 rounded-md" ><p>{props.name}</p></div>)
//             }
//         </>
//     )
// }


// function ButtonAdd(props: { on_click: () => void }) {
//     return (
//         <button onClick={() => props.on_click()} className=" hover:scale-[1.01] hover:text-black/60  text-black/50 hover:drop-shadow-md m-2 mr-0 w-[calc(100%-1rem)] h-10 border  drop-shadow-sm   border-neutral-300 rounded-md bg-neutral-100" >
//             <p className=" font-semibold  ">Add</p>
//         </button>
//     )
// }