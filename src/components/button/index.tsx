
interface IButton {
    text: string,
    onClick: (value: any) => void,
    isDisabled?: boolean,
    widthFull?: boolean,
    roundedFull?: boolean,
    style?: "primary" | "secondary",
    marginDisabled?: boolean
}


export default function Button(props: IButton) {


    const use_width_full = (!!props.widthFull) ? "w-full" : "";
    const use_rounded_full = (!!props.roundedFull) ? "rounded-full" : "rounded-md";
    const use_is_disabled = (!!props.isDisabled) ? "cursor-not-allowed opacity-50" : "cursor-pointer hover:border-black/50 transition-all hover:bg-neutral-500 hover:text-white";
    const use_margin_disabled = (!!props.marginDisabled) ? "m-0":"m-2";
    const custom_style = `${use_width_full} ${use_rounded_full} ${use_is_disabled} ${use_margin_disabled}`;

    return (
        <button
            className={(custom_style + "  bg-neutral-100 border border-neutral-300 h-max outline-neutral-200/80 outline-[4px]  px-4 py-1 outline   text-neutral-500  ease-out duration-100")}
            disabled={!!props.isDisabled}
            onClick={(e) => props.onClick(e)}>
            {props.text}
        </button>
    )
}