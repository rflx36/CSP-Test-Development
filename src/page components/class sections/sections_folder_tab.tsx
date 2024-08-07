export default function SectionsFolderTab(props: { isActive: boolean, year: string, onClick: () => void }) {
    return (props.isActive) ?
        (
            <button
                className="w-max max-h-20 px-4  pb-1 z-[1] relative pt-1
            before:w-full before:bg-neutral-100 before:h-full before:absolute before:content[''] 
            before:left-0 before:top-0 before:rounded-t-lg before:z-[-1] 
            before:border before:border-neutral-300 before:border-b-0">
                <p >{props.year} year</p>
            </button>
        ) :
        (
            <button className="pt-1 w-max text-neutral-500 px-4 pb-1" onClick={() => props.onClick()}>
                <p>{props.year} year</p>
            </button>
        )
}