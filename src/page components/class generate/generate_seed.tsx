import { useState } from "react";
import Baseline from "../../components/baseline";
import Border from "../../components/border";
import Input from "../../components/input";
import Button from "../../components/button";
import RandomizeArray from "../../logic/rng";
import setSeed from "../../logic/seed";


export default function GenerateSeedContainer() {


    const [seed_, setSeed_] = useState(0);
    const [arr, setArr] = useState<Array<any>>([]);
    const test_arr = [12, 45, 78, 23, 56, 89, 34, 67, 90, 11];

    console.log(arr);

    return (
        <Border >
            <Baseline flex>
                <Button text="Randomize" onClick={() => { setArr(RandomizeArray(test_arr, setSeed(seed_))) }} />
                <Input type="number" value={seed_} onChange={x => setSeed_(x)} />
            </Baseline>
            <Baseline widthFull>
                <Button text="Generate" onClick={()=>{}}/>
            </Baseline>
        </Border>
    )
}