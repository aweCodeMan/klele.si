import {useState} from "react";
import CommentSkeletonCard from "../cards/comment-skeleton-card";
import CommentHtml from "./comment-html";
import {PostService} from "../../helpers/post-service";
import {CommentInterface} from "../../domain/comment.interface";
import MarkdownInstructions from "./markdown-instructions";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHashtag} from "@fortawesome/free-solid-svg-icons";

export default function SubmitComment(props: { onSubmit: Function, onCancel?: Function, rootUuid?: any, parentUuid?: string, editComment?: CommentInterface }) {
    const [inPreview, setInPreview] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isShowingInstruction, setIsShowingInstruction] = useState(false);
    const [previewHtml, setPreviewHtml] = useState('');
    const [markdown, setMarkdown] = useState(props.editComment ? props.editComment.markdown : '');

    const submit = () => {
        if (canSubmit()) {
            setIsLoading(true);

            if (props.editComment) {
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

    const toggleInstructions = () => {
        setIsShowingInstruction(!isShowingInstruction);
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

            <div className="border border-black flex flex-col md:flex-row p-2 md:justify-between">

                <div className={'flex flex-col md:flex-row items-center'}>
                    <button className="btn btn-sm btn-outline flex-1 md:flex-auto" onClick={toggleInstructions}
                            style={{width: '150px'}}>
                        <span className="text-xs"><FontAwesomeIcon icon={faHashtag} className={'mr-2'}/></span>
                        {!isShowingInstruction ? 'Prikaži navodila' : 'Skrij navodila'}
                    </button>

                    <div className={''}>
                        <p className="text-sm text-black opacity-50 mx-2 my-2 md:my-0">Uporabljamo Markdown.</p>
                    </div>
                </div>

                <div className={'flex flex-row flex-wrap'}>
                    {!inPreview ? <button className="btn btn-sm btn-outline mr-2 flex-1 md:flex-auto" onClick={showPreview}
                                          disabled={!canSubmit()}>Predogled
                    </button> : <button className="btn btn-sm btn-outline mr-2 flex-1 md:flex-auto" onClick={hidePreview}>Uredi</button>}
                    {props.onCancel ? <button className="btn-sm btn btn-link mr-2"
                                              onClick={cancel}>Prekliči</button> : undefined}
                    <button className="btn btn-sm btn-primary flex-1 md:flex-auto" onClick={submit}
                            disabled={!canSubmit()}>{props.editComment ? 'Posodobi' : 'Komentiraj'}
                    </button>
                </div>
            </div>

            {isShowingInstruction ?
                <div className="mt-4 card">
                    <MarkdownInstructions/>
                </div> : null}
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
