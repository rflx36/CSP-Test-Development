
import { useUIStore } from "../../stores/ui_store";




export default function SectionsButtonCreate() {
    const ui_state = useUIStore();

    const ToggleModal = () => {
        let new_ui_state =ui_state.get;
        new_ui_state.modal = "sections";
        ui_state.set(new_ui_state);
    }
    return (
        <button
            className="m-2 bg-neutral-100 border border-neutral-300  outline-neutral-200/80 outline-[4px]  
        px-4 py-1 rounded-full outline cursor-pointer 
        hover:bg-neutral-500 hover:text-white text-neutral-500 hover:border-black/50
        transition-all 
        ease-out 
        duration-100
        
        "
            onClick={ToggleModal}>
            <p>Create New</p>
        </button>
    )
}