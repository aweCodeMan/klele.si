import {AuthModalType, useAuth} from "../../contexts/auth";
import {useState} from "react";

export default function VerifyNotice(props: { user: any }) {
    const auth = useAuth();

    const [isSending, setIsSending] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    if (!props.user) {
        return null;
    }

    const sendEmail = () => {
        setIsSending(true);

        auth.sendVerificationEmail().then(() => {
            setIsSending(false);
            setIsSuccess(true);
        })
    }

    const showUnverified = () => {
        return isSuccess ?
            <p>Na <b>{auth.user.email}</b> smo ti poslali potrditveno sporočilo, ki ga prosim takoj sedaj
                čimprej
                poklikaj.</p> : <>
                <h3 className={"font-bold leading-normal tracking-wide text-2xl"}>Moraš potrditi svoj
                    email!</h3>

                <p className="my-4">V nasprotnem primeru ti ne moremo zamenjati gesla, če ga pozabiš; niti ne
                    moreš
                    objavljati ali komentirati.</p>

                <div className="flex flex-row justify-center items-center mb-6">
                    <button className="btn btn-primary btn-sm" disabled={isSending}
                            onClick={() => sendEmail()}>Pošlji potrditveni email
                    </button>
                </div>
            </>
    }

    const showVerified = () => {
        return <>
            <h3 className={"my-4 font-bold leading-normal tracking-wide text-xl"}>Super! Imaš potrjen email!</h3>
        </>
    }

    return <>
        <div className="card mx-auto w-full text-center">
            <div>
                {
                    !props.user.verifiedAt ? showUnverified() : showVerified()
                }
            </div>
        </div>
    </>;
}
