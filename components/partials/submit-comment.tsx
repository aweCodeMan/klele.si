import {useState} from "react";
import CommentSkeletonCard from "../cards/comment-skeleton-card";
import CommentHtml from "./comment-html";
import {PostService} from "../../helpers/post-service";
import {CommentInterface} from "../../domain/comment.interface";

export default function SubmitComment(props: { onSubmit: Function, onCancel?: Function, rootUuid?: any, parentUuid?: string, editComment?: CommentInterface }) {
    const [inPreview, setInPreview] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [previewHtml, setPreviewHtml] = useState('');
    const [markdown, setMarkdown] = useState(props.editComment ? props.editComment.markdown : '');

    const submit = () => {
        if (canSubmit()) {
            setIsLoading(true);

            if(props.editComment){
                PostService.updateComment(props.editComment.uuid, {markdown}).then((response) => {
                    setMarkdown('');
                    setPreviewHtml('');
                    setInPreview(false);
                    setIsLoading(false);

                    props.onSubmit(response.data.data);
                })
            } else {
                PostService.storeComment(props.rootUuid, {parentUuid: props.parentUuid, markdown}).then((response) => {
                    setMarkdown('');
                    setPreviewHtml('');
                    setInPreview(false);
                    setIsLoading(false);

                    props.onSubmit(response.data.data);
                })
            }

        }
    }

    const showPreview = (event: any) => {
        event.preventDefault();
        setInPreview(true);
        setIsLoading(true);

        PostService.transformMarkdown(markdown).then((response) => {
            setPreviewHtml(response.data.data);
            setIsLoading(false);
        });
    }

    const hidePreview = (event: any) => {
        event.preventDefault();
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
                inPreview ? (
                        <div className="px-2 pt-2 pb-6">
                            <CommentHtml html={previewHtml}/>
                        </div>
                    ) : (
                        <div className="border border-black border-b-0">
                           <textarea className={'h-full w-full min-h-64 p-2 '} rows={3}
                                     value={markdown}
                                     onChange={onChange}
                                     placeholder={''}/>
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
                    <button className="btn btn-sm btn-primary" onClick={submit} disabled={!canSubmit()}>{props.editComment ? 'Posodobi' : 'Komentiraj'}
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
