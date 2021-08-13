import Shimmer from "./shimmer";
import {useState} from "react";
import CommentHtml from "./comment-html";
import {PostService} from "../../helpers/post-service";

export default function FormMarkdown(props: { label: string, name: string, value: any, onChange: Function, error: any, autocomplete?: string, disabled: boolean }) {
    const [inPreview, setInPreview] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [previewHtml, setPreviewHtml] = useState('');

    const showPreview = (event:any ) => {
        event.preventDefault();
        setInPreview(true);
        setIsLoading(true);

        PostService.transformMarkdown(props.value).then((response) => {
            setPreviewHtml(response.data.data);
            setIsLoading(false);
        });
    }

    const hidePreview = (event:any ) => {
        event.preventDefault();
        setInPreview(false);
        setIsLoading(false);
    }

    const onFormInputChange = (event: any) => {
        props.onChange(props.name, event.target.value);
        event.preventDefault();
        setPreviewHtml('');
    }

    return (
        <div>
            <label><span className="block text-sm leading-normal tracking-wide text-normal mb-1">{props.label}</span>
                {
                    inPreview ? (
                        isLoading ? <Shimmer height={'5rem'}/> : <div className="">
                            <CommentHtml html={previewHtml}/>
                        </div>
                        )  :
                        <textarea
                            className={'w-full block border p-2 ' + (props.error ? ' text-error border-error bg-error-washed' : ' text-black border-black ')}
                            rows={18}
                            disabled={props.disabled}
                            value={props.value}
                            onChange={onFormInputChange}
                            placeholder={'Daj nam pomagaj in povej kaj ti misliš...'}/>
                }

            </label>

            <p className="text-error mt-2">{props.error}</p>

            <div className="mt-4">

                <div className={'mr-2 flex flex-row items-center'}>
                    {!inPreview ? <button className="btn btn-sm btn-outline mr-2" onClick={showPreview}
                                          disabled={props.value.trim().length === 0}>Predogled
                    </button> : <button className="btn btn-sm btn-outline mr-2" onClick={hidePreview}>Uredi</button>}
                    <p className="text-sm text-black opacity-50">Uporabljamo Markdown.</p>
                </div>
            </div>

        </div>
    )
}
