import {ModalState, useAuth} from "../../contexts/auth";

export default function LoginNotice() {
    const auth = useAuth();

    return <>
        <div className="card mx-auto w-full text-center">
            <div>
                <h3 className={"font-bold leading-normal tracking-wide text-3xl"}>Tole pa ne bo šlo!</h3>

                <p className="my-4">Za dostop do te vsebine se bo treba prijaviti.</p>

                <div className="flex flex-row justify-center items-center">
                    <button className="btn btn-primary btn-sm" onClick={() => {
                        auth.setModalType(ModalState.LOGIN);
                        auth.openAuthModal();
                    }}>Prijava
                    </button>
                </div>
            </div>
        </div>
    </>;
}
