import Head from "next/head";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLink, faFile} from "@fortawesome/free-solid-svg-icons";
import {useEffect, useState} from "react";
import FormSelect from "../components/partials/form-select";
import FormInput from "../components/partials/form-input";
import FormMarkdown from "../components/partials/form-markdown";
import Navbar from "../components/navbar";
import {useAuth} from "../contexts/auth";
import LoginNotice from "../components/partials/login-notice";
import VerifyNotice from "../components/partials/verify-notice";
import {GroupService} from "../helpers/group-service";
import Joi from "joi";
import {FormHelper} from "../helpers/form";
import {PostService} from "../helpers/post-service";
import {useRouter} from "next/router";

export default function SubmitContent() {
    const auth = useAuth();
    const router = useRouter();
    const [isEdit, setIsEdit] = useState(false);
    const [postUuid, setPostUuid] = useState(null);

    const markdownSchema = Joi.object(
        {
            postType: Joi.any(),
            groupUuid: Joi.any(),
            title: Joi.string().trim().required(),
            markdown: Joi.string().trim().required(),
            link: Joi.any(),
        }
    ).messages({
        'string.empty': 'Polje je obvezno.',
    });

    const linkSchema = Joi.object(
        {
            postType: Joi.any(),
            groupUuid: Joi.any(),
            title: Joi.string().trim().required(),
            markdown: Joi.any(),
            link: Joi.string().trim().uri({allowRelative: false}).required(),
        }
    ).messages({
        'string.empty': 'Polje je obvezno.',
    });

    const [form, setForm] = useState({
        postType: 0,
        groupUuid: null,
        title: '',
        link: '',
        markdown: '',
    })

    const [errors, setErrors] = useState({
        groupUuid: null,
        title: '',
        link: '',
        markdown: '',
    });
    const [isLoading, setIsLoading] = useState(false);

    const [groups, setGroups] = useState([]);

    useEffect(() => {
        GroupService.getGroups().then((response) => setGroups(response.data.data));

        if (router.query.postUuid) {
            // @ts-ignore
            setPostUuid(router.query.postUuid);

            setIsLoading(true);
            setIsEdit(true);

            PostService.getEdit(router.query.postUuid.toString()).then((response) => {
                const editForm: any = {
                    title: response.data.data.title,
                    postType: response.data.data.postType,
                };

                if (response.data.data.markdown) {
                    editForm.markdown = response.data.data.markdown;
                } else if (response.data.data.link) {
                    editForm.link = response.data.data.link;
                }

                setErrors(FormHelper.getJoiErrors(editForm.postType == 0 ? markdownSchema : linkSchema, editForm));
                setForm(editForm);

                setIsLoading(false);
            })
        }
    }, [router.query.postUuid]);

    const onFormChange = (name: string, value: any) => {
        const updatedForm = {...form, [name]: value};

        setErrors(FormHelper.getJoiErrors(updatedForm.postType == 0 ? markdownSchema : linkSchema, updatedForm));
        setForm(updatedForm);
    }

    const isFormValid = () => {
        const schema = form.postType == 0 ? markdownSchema : linkSchema;
        return schema.validate(form).error === undefined;
    }

    const submit = (event: any) => {
        event.preventDefault();

        setIsLoading(true);

        if (isEdit) {
            PostService.update(postUuid + "", form).then((response) => {
                setIsLoading(false);
                router.push('/guna/' + response.data.data.slug);
            });
        } else {
            PostService.publish(form).then((response) => {
                setIsLoading(false);
                router.push('/guna/' + response.data.data.slug);
            });
        }
    }

    const setType = (number: number) => {
        onFormChange('postType', number);
    }

    const showForm = () => {
        return (
            !auth.user.verifiedAt ? <VerifyNotice user={auth.user}/> : <>
                <div className="card mx-auto w-full" style={{maxWidth: '800px'}}>
                    <h1 className="font-bold leading-normal tracking-wide text-3xl">{isEdit ? 'Uredi prispevek' : 'Objavi nov prispevek'}</h1>

                    <hr className="my-2"/>

                    {
                        !isEdit ? <div className="flex flex-row my-4">
                            <button className={'btn btn-outline mr-2 ' + (form.postType === 0 ? 'selected' : undefined)}
                                    disabled={isLoading}

                                    onClick={() => setType(0)}><FontAwesomeIcon icon={faFile}
                                                                                className="mr-2"/> Prispevek
                            </button>
                            <button className={'btn btn-outline  ' + (form.postType === 1 ? 'selected' : undefined)}
                                    disabled={isLoading}
                                    onClick={() => setType(1)}><FontAwesomeIcon icon={faLink} className="mr-2"/>Povezava
                            </button>
                        </div> : null
                    }


                    <form onSubmit={submit}>
                        {
                            !isEdit ?
                                <div className="mb-3">
                                    <FormSelect label="Skupina:" name="groupUuid" value={form.groupUuid}
                                                onChange={onFormChange}
                                                error={null} disabled={isLoading} options={groups.map((item: any) => {
                                        return {value: item.uuid, label: item.name};
                                    })}/>
                                </div> : null
                        }

                        <div className="mb-3">
                            <FormInput type={'text'} label={'Naslov:'}
                                       name="title"
                                       onChange={onFormChange}
                                       error={errors.title}
                                       autocomplete="off"
                                       disabled={isLoading}
                                       value={form.title}/>
                        </div>

                        {
                            form.postType === 0 ? <div className="mb-3">
                                <FormMarkdown label="Vsebina:" name="markdown" value={form.markdown}
                                              onChange={onFormChange}
                                              error={errors.markdown} disabled={isLoading}/>
                            </div> : null
                        }

                        {
                            form.postType === 1 && !isEdit ? <div className="mb-3">
                                <FormInput type={'text'} label={'Povezava:'}
                                           name="link"
                                           onChange={onFormChange}
                                           error={errors.link}
                                           autocomplete="off"
                                           disabled={isLoading}
                                           value={form.link}/>
                            </div> : null
                        }

                        <div className="mt-10 text-right">
                            <button className="btn btn-primary" type="submit"
                                    disabled={!isFormValid() || isLoading}>{isEdit ? 'Posodobi' : 'Objavi'}
                            </button>
                        </div>
                    </form>
                </div>
            </>)
    }

    return <div>
        <Head>
            <title>Objavi | Klele.si</title>
            <meta name="description" content=""/>
        </Head>

        <Navbar/>

        <main className={'my-16 flex flex-col justify-center px-2 md:px-6 mx-auto'} style={{maxWidth: '800px'}}>
            {!auth.user ? <LoginNotice/> : showForm()}
        </main>
    </div>
}
