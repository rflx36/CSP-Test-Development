import { useUIStore } from "../../../stores/ui_store"






export default function Sidebar() {
    const ui_state = useUIStore();
    const active = ui_state.get.sidebar_is_active;

    const Toggle = () => {
        ui_state.get.sidebar_is_active = !active;
        ui_state.set(ui_state.get);
    }

    return (
        <div className={((active) ? "hover:w-52 w-10" : "hover:w-52 w-0") + " h-full bg-neutral-800 absolute  transition-all ease-in duration-100"}>
            <div className="w-[calc(100%-0.5rem)] h-max m-1 bg-neutral-700/50  ">
                <button onClick={Toggle}>=</button>
            </div>

        </div>
    )
}