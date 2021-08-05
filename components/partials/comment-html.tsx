export default function CommentHtml(props: { html: string }) {

    return (
        <>
            <div className="prose" dangerouslySetInnerHTML={{__html: props.html}}/>
        </>
    );
}
