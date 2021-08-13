import React, {useState, useEffect, useContext, createContext} from "react";
import {ApiClient} from "../helpers/api-client";
import {UserService} from "../helpers/user-service";

export enum AuthModalType {
    LOGIN,
    REGISTER,
    FORGOT_PASSWORD
}

const initial: any = {};
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
    const [modalType, setModalType] = useState(AuthModalType.LOGIN)

    const storeUser = (user: any) => {
        localStorage.setItem('user', JSON.stringify(user));
    }

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user') as string);

        if (user) {
            if (!user.verifiedAt) {
                UserService.getProfile().then((response) => {
                    storeUser(response.data.data);
                    setUser(response.data.data);
                })
            } else {
                setUser(user)
            }
        }
    }, []);

    const logout = () => {
        ApiClient.post('/api/users/logout').then((response) => {
        }).finally(() => {
            localStorage.removeItem('user');
            setUser(null);
        });
    }

    const login = (data: { email: string, password: string }) => {
        return getCsrfCookie().then(() => {
            return ApiClient.post('/api/users/login', data).then((response) => {
                storeUser(response.data.data);
                setUser(response.data.data);
            });
        });
    }

    const register = (data: { email: string, password: string }) => {
        return getCsrfCookie().then(() => {
            return ApiClient.post('/api/users', data).then((response) => {
                storeUser(response.data.data);
                setUser(response.data.data);
            });
        });
    }

    const update = (data: { name: string, surname: string }) => {
        return ApiClient.put('/api/users', data).then((response) => {
            storeUser(response.data.data);
            setUser(response.data.data);
        });
    }

    const sendVerificationEmail = () => {
        return ApiClient.post('/api/users/reverify', {});
    }

    const sendForgotPasswordEmail = (data: { email: string }) => {
        return getCsrfCookie().then(() => {
            return ApiClient.post('/api/forgot-password', data);
        });
    }
    const resetPassword = (data: { email: string, token: string, password: string }) => {
        return getCsrfCookie().then(() => {
            return ApiClient.post('/api/password-reset', data);
        });
    }

    const getCsrfCookie = () => {
        return ApiClient.get('/sanctum/csrf-cookie');
    }

    const openAuthModal = (type: AuthModalType = AuthModalType.LOGIN) => {
        setModalType(type);
        setIsAuthModalOpened(true);
    }

    const closeAuthModal = () => {
        setIsAuthModalOpened(false);
    }

    return {
        user,
        login,
        register,
        update,
        logout,
        sendVerificationEmail,
        sendForgotPasswordEmail,
        resetPassword,
        openAuthModal,
        closeAuthModal,
        isAuthModalOpened,
        modalType,
    };
}

