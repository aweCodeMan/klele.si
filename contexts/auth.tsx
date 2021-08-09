import React, {useState, useEffect, useContext, createContext} from "react";
import ApiClient from "../helpers/api-client";

export enum ModalState {
    LOGIN,
    REGISTER,
    FORGOT_PASSWORD
}

const initial: {
    sendReverifyEmail: Function,
    user?: any, logout: Function, login: Function, openAuthModal: Function, closeAuthModal: Function, isAuthModalOpened: boolean, modalType: number, setModalType: Function
    register(form: { password: string; repeatPassword: string; email: string }): any;
    update(form: { surname: string; name: string }): any;
} = {
    update(form: { surname: string; name: string }): any {
    },
    register(form: { password: string; repeatPassword: string; email: string }): any {
    },
    closeAuthModal: () => {
    }, isAuthModalOpened: false, openAuthModal: () => {
    },
    logout: () => {
    },sendReverifyEmail: () => {
    },
    login: () => {
    },
    setModalType: () => {
    },
    modalType: ModalState.REGISTER
}
const authContext = createContext(initial);

export function ProvideAuth({children}: any) {
    const auth = useProvideAuth();
    return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
    return useContext(authContext);
};

function useProvideAuth() {
    const [user, setUser]: any = useState(null);
    const [isAuthModalOpened, setIsAuthModalOpened] = useState(false);
    const [modalType, setModalType] = useState(ModalState.REGISTER)

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user') as string);
        setUser(user)
    }, []);

    const logout = () => {
        //  TODO: Clear cookies as well, clear token from API
        localStorage.removeItem('user');
        setUser(null);
    }

    const login = (data: { email: string, password: string }) => {
        return getCsrfCookie().then(() => {
            return ApiClient().post('/api/users/login', data).then((response) => {
                localStorage.setItem('user', JSON.stringify(response.data.data));
                setUser(response.data.data);
            });
        });
    }

    const register = (data: { email: string, password: string }) => {
        return getCsrfCookie().then(() => {
            return ApiClient().post('/api/users', data).then((response) => {
                localStorage.setItem('user', JSON.stringify(response.data.data));
                setUser(response.data.data);
            });
        });
    }

    const update = (data: { name: string, surname: string }) => {
        return ApiClient().put('/api/users', data).then((response) => {
            localStorage.setItem('user', JSON.stringify(response.data.data));
            setUser(response.data.data);
        });
    }

    const sendReverifyEmail = (data: { name: string, surname: string }) => {
        return ApiClient().post('/api/users/reverify', data);
    }

    const getCsrfCookie = () => {
        return ApiClient().get('/sanctum/csrf-cookie');
    }

    const openAuthModal = () => {
        setIsAuthModalOpened(true);
    }

    const closeAuthModal = () => {
        setIsAuthModalOpened(false);
    }

    return {
        user,
        logout,
        login,
        register,
        openAuthModal,
        closeAuthModal,
        update,
        isAuthModalOpened,
        setModalType,
        modalType,
        sendReverifyEmail,
    };
}

