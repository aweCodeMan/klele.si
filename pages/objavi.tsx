import Head from "next/head";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLink, faFile} from "@fortawesome/free-solid-svg-icons";
import {useState} from "react";
import FormSelect from "../components/partials/form-select";
import FormInput from "../components/partials/form-input";
import FormMarkdown from "../components/partials/form-markdown";
import Navbar from "../components/navbar";

export default function SubmitContent() {
    const [type, setType] = useState(0);
    const [form, setForm] = useState({
        group: null,
        title: '',
        url: '',
        markdown: '',
    })

    const options = [
        {label: 'programiranje', value: 'programiranje'},
        {label: 'oblikovanje', value: 'oblikovanje'},
        {label: 'razno', value: 'razno'},
    ];

    const onFormChange = (name: string, value: any) => {
        const copy = {...form};
        // @ts-ignore
        copy[name] = value;
        setForm(copy);
    }

    const submit = (event:any) => {
        event.preventDefault();
    }

    return <div>
        <Head>
            <title>Objavi | Klele.si</title>
            <meta name="description" content=""/>
        </Head>

        <Navbar/>

        <main className={'my-16 flex flex-col justify-center px-2 md:px-6'}>

            <div className="card mx-auto w-full" style={{maxWidth: '800px'}}>
                <h1 className="font-bold leading-normal tracking-wide text-3xl">Objavi nov prispevek</h1>

                <hr className="my-2"/>

                <div className="flex flex-row my-4">
                    <button className={'btn btn-outline mr-2 ' + (type === 0 ? 'selected' : undefined)}
                            onClick={() => setType(0)}><FontAwesomeIcon icon={faFile} className="mr-2"/> Prispevek
                    </button>
                    <button className={'btn btn-outline  ' + (type === 1 ? 'selected' : undefined)}
                            onClick={() => setType(1)}><FontAwesomeIcon icon={faLink} className="mr-2"/>Povezava
                    </button>
                </div>

                <form onSubmit={submit}>
                    <div className="mb-3">
                        <FormSelect label="Skupina:" name="group" value={form.group} onChange={onFormChange}
                                    error={null} disabled={false} options={options}/>
                    </div>

                    <div className="mb-3">
                        <FormInput label="Naslov:" type="text" name="title" value={form.title} onChange={onFormChange} error={null} disabled={false}/>
                    </div>

                    {
                        type === 0 ? <div className="mb-3">
                            <FormMarkdown label="Vsebina:"  name="markdown" value={form.markdown} onChange={onFormChange} error={null} disabled={false}/>
                        </div> : null
                    }

                    {
                        type === 1 ? <div className="mb-3">
                            <FormInput label="Povezava:" type="text" name="url" value={form.url} onChange={onFormChange} error={null} disabled={false}/>
                        </div> : null
                    }

                    <div className="mt-10 text-right">
                        <button className="btn btn-primary" type="submit">Objavi</button>
                    </div>
                </form>
            </div>
        </main>
    </div>
}
