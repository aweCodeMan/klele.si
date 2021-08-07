import Shimmer from "./shimmer";

export default function FormSelect(props: { label: string, name: string, value: any, onChange: Function, error: any, disabled: boolean, options: { label: string, value: any }[] }) {
    const onFormInputChange = (event: any) => {
        props.onChange(props.name, event.target.value);
        event.preventDefault();
    }

    return (
        <div>
            <label><span className="block text-sm leading-normal tracking-wide text-normal mb-1">{props.label}</span>
                <select
                    className={'w-full block border p-2 ' + (props.error ? ' text-error border-error bg-error-washed' : ' text-black border-black ')}
                    onChange={onFormInputChange}
                    name={props.name}>
                    {
                        props.options.map((item, index) => {
                            return <option key={index} value={item.value}>{item.label}</option>
                        })
                    }
                </select>
            </label>

            <p className="text-error mt-2">{props.error?.message}</p>
        </div>
    )
}
