import {useState} from "react";

export default function Shimmer(props: {
    width?: string,
    height?: string,
}) {
    const [height] = useState(props.height ?? '0.75rem');
    const [width] = useState(props.width ?? '100%');

    return (
        <div style={{width, height}} className={'skeleton'}/>
    )
}
