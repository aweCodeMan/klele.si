import Shimmer from "./shimmer";
import {useEffect, useState} from "react";

export default function FormSelect(props: { label: string, name: string, value: any, onChange: Function, error: any, disabled: boolean, options: { label: string, value: any }[] }) {

    const [options, setOptions]: any = useState([]);

    useEffect(() => {
        if (options.length === 0 && props.options.length > 0) {
            setOptions(props.options);

            props.onChange(props.name, props.options[0].value);
        }
    }, [props.options])

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
                    disabled={props.disabled}
                    name={props.name}>
                    {
                        options.map((item: any, index: number) => {
                            return <option key={index} value={item.value}>{item.label}</option>
                        })
                    }
                </select>
            </label>

            <p className="text-error mt-2">{props.error?.message}</p>
        </div>
    )
}
