export default function Author(props: { author: any }) {
    return (
        <span>
                            {props.author.fullName.length > 0 ?
                                <span>{props.author.fullName} (@{props.author.nickname})</span> :
                                <span>@{props.author.nickname}</span>}
                </span>
    )
}
