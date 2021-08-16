export default function Author(props: { author: any, emphasizeAuthor?: boolean }) {
    return (<span>
                {props.author.fullName.length > 0 ?
                    <span><span
                        className={(props.emphasizeAuthor ? 'font-bold' : '')}>{props.author.fullName}</span> (@{props.author.nickname})</span> :
                    <span className={(props.emphasizeAuthor ? 'font-bold' : '')}>@{props.author.nickname}</span>}
                </span>
    )
}
