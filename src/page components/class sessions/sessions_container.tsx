import { useState } from "react";
import Input from "../../components/input";
import Border from "../../components/border";
import Baseline from "../../components/baseline";
import { useSessionStore } from "../../stores/session_store";
import Button from "../../components/button";
import Chip from "../../components/chip";
import ChipContainer from "../../components/chip/container";



export default function ClassSessionsContainer() {
  const [timeStart, setTimeStart] = useState("07:00");
  const [timeEnd, setTimeEnd] = useState("21:00");
  const [course, setCourse] = useState("");
  const [code, setCode] = useState("");
  const session = useSessionStore();

  // const class_total_hours = (parseInt(timeEnd) - parseInt(timeStart))
  const AddCourse = () => {

    session.get.courses.push({ name: course, code: code });
    session.set();
    setCourse("");
    setCode("");
  }

  const RemoveCourse = (i: number) => {
    session.get.courses.splice(i, 1);
    session.set();
  }

  return (
    <Border>
      <Baseline flex>
        <Input label="Start time" type="time" value={timeStart} onChange={x => setTimeStart(x)} />
        <Input label="End time" type="time" value={timeEnd} onChange={x => setTimeEnd(x)} />
      </Baseline>

      <Baseline>
        <div className="flex items-end">
          <Input label="Course name" type="text" value={course} onChange={x => setCourse(x)} size="large"/>
          <Input label="Abbreviation" type="text" value={code} onChange={x => setCode(x)} size="small"/>
          <Button text="Add Course" onClick={AddCourse} isDisabled={(course == "" || code == "")}  />
        </div>
        <ChipContainer>
            {session.get.courses.map((e, i) => {

              return <Chip key={i} text={e.code} title={e.name} onRemove={() => RemoveCourse(i)} />
            })}
          </ChipContainer>
      </Baseline>

    
            

    </Border>
  )
}