import React from "react"


interface InputType {
    type: "number" | "text" | "time",
    value: string | number,
    onChange: (x: any) => void,
    label?: string,
    min?: number,
    required?: boolean,
    size?: "small" | "base" | "large"
}





export default function Input(props: InputType) {


    const UpdateValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value: string | number = e.currentTarget.value;
        if (props.type == "number") {
            value = e.currentTarget.valueAsNumber
            if ((typeof value) != "number") {
                return;
            }
        }
        props.onChange(value);
    }
    const size = () => {
        switch (props.size) {
            case "small":
                return "max-w-36";
            case "large":
                return "min-w-64";
            default:
                return "max-w-48";
        }
    }
    const custom_style = `${size()}`;

    return (
        <div className="flex flex-col m-2 w-auto">
            {
                (props.label != null) &&
                (<label className="font-manrope-semibold text-sm mb-1" >{props.label}</label>)
            }
            <input
                type={props.type}
                value={props.value}
                className={custom_style + " h-9 font-manrope-regular   px-3 py-[4px] max-w-36 tabular-nums outline-1 focus:outline-2 focus:outline-neutral-400 outline  rounded-[4px] outline-neutral-300 bg-neutral-200/50 "}
                onChange={UpdateValue}
                required={!!props.required}
            />
        </div>
    )
}