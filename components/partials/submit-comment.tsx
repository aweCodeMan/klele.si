import {useState} from "react";
import CommentSkeletonCard from "../cards/comment-skeleton-card";
import CommentHtml from "./comment-html";

export default function SubmitComment(props: { onSubmit?: Function, onCancel?: Function }) {
    const [inPreview, setInPreview] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [previewHtml, setPreviewHtml] = useState('');
    const [markdown, setMarkdown] = useState('');

    const submit = () => {
        if (canSubmit()) {
            setIsLoading(true);

            setTimeout(() => {
                setMarkdown('');
                setInPreview(false);
                setIsLoading(false);
                if (props.onSubmit) {
                    props.onSubmit();
                }
            }, 500)
        }
    }

    const showPreview = () => {
        setInPreview(true);
        setIsLoading(true);

        setTimeout(() => {
            setIsLoading(false)
            setPreviewHtml("<p>We miss you on Data IRL but I\'m really happy that you were able to make the leap to this new role and am encouraged knowing you\'re over there helping Reddit be successful in new ways! Great write-up.</p>")
        }, 750);
    }

    const hidePreview = () => {
        setInPreview(false);
        setIsLoading(false);
    }

    const canSubmit = () => {
        return markdown.trim().length > 0;
    }

    const onChange = (event: any) => {
        event.preventDefault();
        setMarkdown(`${event.target.value}`);
        setPreviewHtml('');
    }

    const cancel = () => {
        if (props.onCancel) {
            props.onCancel();
        }
    }

    const showContent = () => {
        return <div className="card">
            {
                inPreview ?
                    (
                        <div className="px-2 pt-2 pb-6">
                            <CommentHtml html={previewHtml}/>
                        </div>
                    ) : (
                        <div className="border border-black border-b-0">
                           <textarea className={'h-full w-full min-h-64 p-2 '} rows={3}
                                     value={markdown}
                                     onChange={onChange}
                                     placeholder={'Daj nam pomagaj in povej kaj ti misliš...'}/>
                        </div>
                    )
            }


            <div className="border border-black flex flex-row justify-between p-2">
                <div className={'mr-2 flex flex-row items-center justify-center'}>
                    {!inPreview ? <button className="btn btn-sm btn-outline mr-2" onClick={showPreview}
                                          disabled={!canSubmit()}>Predogled
                    </button> : <button className="btn btn-sm btn-outline mr-2" onClick={hidePreview}>Uredi</button>}
                    <p className="text-sm text-black opacity-50">Uporabljamo Markdown.</p>
                </div>

                <div>
                    {props.onCancel ? <button className="btn-sm btn btn-link mr-2"
                                              onClick={cancel}>Prekliči</button> : undefined}
                    <button className="btn btn-sm btn-primary" onClick={submit} disabled={!canSubmit()}>Komentiraj
                    </button>
                </div>
            </div>
        </div>;
    }

    const showLoading = () => {
        return (
            <div className="card">
                <div className="border border-black p-2">
                    <CommentSkeletonCard/>
                </div>
            </div>
        );
    }

    return (
        <>
            {isLoading ? showLoading() : showContent()}
        </>
    )
}
