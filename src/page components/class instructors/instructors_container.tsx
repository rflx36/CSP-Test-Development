import Baseline from "../../components/baseline";
import Border from "../../components/border";
import Button from "../../components/button";
import { useUIStore } from "../../stores/ui_store";




export default function ClassInstructorsContainer() {
    const ui_state = useUIStore();


    const ToggleInstructorModal = () => {
        ui_state.get.modal = "instructors";
        ui_state.set();
    }
    return (
        <Border>
            <Baseline>
                <Button text="Add Instructor" onClick={ToggleInstructorModal}/>
                
            </Baseline>
        </Border>

    )
}