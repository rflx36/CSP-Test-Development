import { TimeType, WeekType } from "../../types/types";
import { ConvertTimeToValue, ConvertValueToTime } from "../time_utils/time_converter";

export type StorageType = `${number};${number};${TimeType}`;

export default function TestCheckAvailability(
    storage: Array<StorageType>,
    type_index: number,
    time_start: TimeType,
    time_end: TimeType,
    day: WeekType) {

    // const [room_name, weekday, time, identifier] = t.map(x => x.split(':').map(Number));

    const time_start_value = ConvertTimeToValue(time_start);
    const time_end_value = ConvertTimeToValue(time_end);
    const days: Array<WeekType> = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
    const day_index = days.indexOf(day);

    const data = storage.filter(x => x.startsWith(`${type_index};${day_index};`));
    const t = data.map(x => x.split(';').pop() as TimeType);

    console.log(t.map(x=> ConvertTimeToValue(x)));
    console.log(t);
    const has = t.filter( x => ConvertTimeToValue(x) < time_start_value);
    const has_2 = t.filter( x => time_start_value <= ConvertTimeToValue(x) && ConvertTimeToValue(x) < time_end_value);
    


    const l = Math.max(...has.map(x=> ConvertTimeToValue(x)));
       
    if (l < time_start_value && l % 2 == 0){
        console.log("not finish");
    }

    if (has_2.length != 0){
        console.log("occupied in between");
    }



    console.log(ConvertValueToTime(l))
    // const hs_  = has.map(x => ConvertTimeToValue(x));
    // const h = Math.max(...hs_);
    // const leh = ConvertValueToTime(h);
    // const hasfindindex = t.indexOf(leh);
    // console.log(leh.toString());
    // console.log(hasfindindex);
    // // const has = t.filter(num => num < time_start_value && num % 2 !== 0);
    // const has_2 = t.filter( x => time_start_value <= ConvertTimeToValue(x) && ConvertTimeToValue(x) < time_end_value);
    // console.log(has);
    // console.log(has_2);
    // console.log(t[hasfindindex+1]);
    // const check = t.find(x=> x < tim)
    // if (smallerOdds.length === 0) {
    //     return null; // Return null if no smaller odd numbers are found
    // }

    // // Find the nearest smaller odd number
    // return smallerOdds.reduce((nearest, current) =>
    //     Math.abs(time_start_value - current) < Math.abs(time_start_value - nearest) ? current : nearest
    // );



    // })
    // const [time, identifier] = data.map(x => {
    //     const [time, identifier] = x.split(';');
    //     const [hours, minutes] = time.split(':').map(Number);
    //     let t = (hours * 60) + minutes;
    //     return [t, identifier];
    // })
    // let t = time.map(Number).filter(x => time_start_value <= x && x < time_end_value);


}