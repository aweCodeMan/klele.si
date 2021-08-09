import {ModalState, useAuth} from "../../contexts/auth";
import {useState} from "react";

export default function VerifyNotice() {
    const auth = useAuth();

    const [isSending, setIsSending] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    if(!auth.user)
    {
        return null;
    }

    const sendEmail = () => {
        setIsSending(true);

        auth.sendReverifyEmail().then(() => {
            setIsSending(false);
            setIsSuccess(true);
        })
    }

    return <>
        <div className="card mx-auto w-full text-center">
            <div>
                {
                    isSuccess ? <p>Na <b>{auth.user.email}</b> smo ti poslali potrditveno sporočilo, ki ga prosim takoj sedaj čimprej
                            poklikaj.</p>: <>
                        <h3 className={"font-bold leading-normal tracking-wide text-2xl"}>Moraš potrditi tvoj email!</h3>

                        <p className="my-4">V nasprotnem primeru ti ne moremo zamenjati gesla, če ga pozabiš; niti ne moreš
                            objavljati ali komentirati.</p>

                        <div className="flex flex-row justify-center items-center mb-6">
                            <button className="btn btn-primary btn-sm" disabled={isSending} onClick={() => sendEmail()}>Pošlji potrditveni email
                            </button>
                        </div>
                    </>
                }

            </div>
        </div>
    </>;
}
