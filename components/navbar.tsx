import Link from 'next/link'
import Logo from "./logo";
import React, {createRef, forwardRef, useEffect, useRef, useState} from "react";
import {AuthModalType, useAuth} from "../contexts/auth";
import AuthModal from "./modals/auth-modal";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBell} from "@fortawesome/free-solid-svg-icons";
import {UserService} from "../helpers/user-service";
import Shimmer from "./partials/shimmer";
import {faComment} from "@fortawesome/free-regular-svg-icons";
import AuthorMeta from "./partials/author-meta";
import {useRouter} from "next/router";

export default function Navbar() {
    const [hasMounted, setHasMounted] = useState(false);
    const auth = useAuth();

    useEffect(() => {
        setHasMounted(true);
    }, [])

    return (
        <>
            <nav className={'bg-white w-full border-b border-black px-3 flex flex-row justify-between items-center'}
                 role="navigation">
                <div className={'py-5'}>
                    <Link href="/">
                        <a className={'btn-logo'}>
                            <Logo/>
                        </a>
                    </Link>
                </div>

                <Buttons auth={auth} hasMounted={hasMounted}/>
            </nav>

            <AuthModal/>
        </>
    )
}

function Buttons(props: { auth: any, hasMounted: boolean }) {
    if (!props.hasMounted) {
        return null;
    }

    return props.auth.user ? <AuthButtons auth={props.auth}/> : <GuestButtons auth={props.auth}/>;
}

function AuthButtons(props: { auth: any }) {
    const [hasLoadedNotifications, setHasLoadedNotifications] = useState(false);
    const [counters, setCounters] = useState({numberOfUnreadNotifications: 0});
    const [hasNotificationsOpened, setHasNotificationsOpened] = useState(false);

    useEffect(() => {
        refresh();
    }, [])

    const refresh = () => {
        UserService.getStats().then((response) => {
            setHasLoadedNotifications(true);
            setCounters(response.data.data);
        });
    }

    const toggleNotificationList = () => {
        setHasNotificationsOpened(!hasNotificationsOpened);
    }

    return <div>
        {
            hasLoadedNotifications ? <>
                <button className={'mr-2 relative btn btn-link ' + (hasNotificationsOpened ? 'text-red' : '')}
                        onClick={() => toggleNotificationList()}>
                    {counters.numberOfUnreadNotifications > 0 ?
                        <div
                            className="absolute rounded-full w-5 h-5 bg-red text-white text-xs leading-none flex justify-center items-center -mt-2 right-0 mr-1">
                            {counters.numberOfUnreadNotifications > 9 ? '9+' : counters.numberOfUnreadNotifications}
                        </div> : null
                    }

                    <FontAwesomeIcon icon={faBell}/>
                </button>
                {
                    hasNotificationsOpened ? <NotificationList onNumberOfUnreadNotificationsChange={() => refresh()}
                                                               onNavigate={toggleNotificationList}
                                                               numberOfUnreadNotifications={counters.numberOfUnreadNotifications}/> : null
                }

            </> : null
        }

        <Link href="/objavi">
            <a className="btn btn-primary mr-2 hidden sm:inline">
                Objavi prispevek
            </a>
        </Link>

        <Link href="/profil">
            <a className="btn btn-outline mr-2 hidden sm:inline">
                @{props.auth.user.nickname}
            </a>
        </Link>

        <button className="btn btn-link"
                onClick={() => props.auth.logout()}>
            Odjava
        </button>
    </div>;
}

function GuestButtons(props: { auth: any }) {
    return (
        <div>
            <button className="btn btn-outline mr-2"
                    onClick={() => props.auth.openAuthModal(AuthModalType.LOGIN)}>
                Prijava
            </button>

            <button className="btn btn-primary"
                    onClick={() => props.auth.openAuthModal(AuthModalType.REGISTER)}>
                Registracija
            </button>
        </div>
    );
}

function NotificationList(props: { numberOfUnreadNotifications: number, onNumberOfUnreadNotificationsChange: Function, onNavigate: Function }) {
    const ref = useRef(null);
    const [loading, setLoading] = useState(false);
    const [response, setResponse]: any = useState(null);

    useEffect(() => {
        loadPage(1, []);
    }, []);

    const loadPage = (page: number, existingNotification: any[]) => {
        setLoading(true);
        UserService.getNotifications(page).then((response) => {
            const res = response.data;

            res.data = [...existingNotification, ...res.data];

            setResponse(res);
            setLoading(false);
        });
    }

    const shimmers = () => {
        return <div className={'flex flex-col'}>
            <div className="mb-2">
                <Shimmer height={'2rem'}/>
            </div>
            <div className="mb-2">
                <Shimmer height={'2rem'}/>
            </div>
            <div className="mb-2">
                <Shimmer height={'2rem'}/>
            </div>
            <div className="mb-2">
                <Shimmer height={'2rem'}/>
            </div>
        </div>
    }

    const tryToLoadNextPage = () => {
        const diff = response.meta.total - response.data.length;

        if (diff > 0 && !loading) {
            loadPage(response.meta.currentPage + 1, response.data);
        }
    }

    const onScroll = () => {
        if (!ref.current) {
            return;
        }

        const element = ref.current as any;

        const scrollTop = element.scrollTop
        const offsetHeight = element.offsetHeight;
        const scrollHeight = element.scrollHeight;

        if (offsetHeight + scrollTop >= (scrollHeight - 20)) {
            tryToLoadNextPage();
        }
    }

    const onNavigate = () => {
        props.onNavigate();
    }

    const showNotifications = () => {
        if (response.data.length === 0) {
            return <div className={'p-3 text-center italic<'}>
                Nimaš notifikacij.
            </div>
        }

        return <>
            {
                response.data.map((item: any) => {
                    return <Notification onNumberOfUnreadNotificationsChange={props.onNumberOfUnreadNotificationsChange}
                                         onNavigate={onNavigate}
                                         key={item.uuid} notification={item}/>
                })
            }
        </>
    }

    const markAllAsRead = () => {
        UserService.markAllNotificationsAsRead().then((res) => {
            const copy = {...response};
            copy.data = response.data.map((item: any) => {
                if (!item.readAt) {
                    item.readAt = (new Date().toString())
                }

                return {...item};
            });
            setResponse(copy);
            props.onNumberOfUnreadNotificationsChange();
        });
    }

    return <div className={'card absolute max-w-full z-20 right-4 md:right-auto'} style={{width: '380px'}}>
        <div className="flex flex-row justify-between items-center -mt-2">
            <h3 className="font-bold text-black text-base mr-2 py-2">Notifikacije</h3>
            {
                response !== null && props.numberOfUnreadNotifications > 0 ?
                    <button onClick={() => markAllAsRead()} className="btn btn-link text-red"><span className="text-sm">Označi vse kot prebrano</span>
                    </button> : null
            }
        </div>

        <div className={'flex flex-col ' + (response && response.data.length > 3 ? 'overflow-y-scroll' : '')}
             style={{maxHeight: '60vh', height: response && response.data.length > 3 ? '350px' : 'auto'}} ref={ref}
             onScroll={onScroll}>

            {
                response !== null ? showNotifications() : null
            }

            {
                loading ? shimmers() : null
            }
        </div>
    </div>
}

function Notification(props: { notification: any, onNumberOfUnreadNotificationsChange: Function, onNavigate: Function }) {
    const [notification, setNotification] = useState(props.notification);
    const router = useRouter();

    const readNotification = (uuid: string) => {
        return UserService.readNotification(uuid).then((response) => {
            setNotification(response.data.data);
            props.onNumberOfUnreadNotificationsChange();
        })
    }

    const navigate = () => {
        readNotification(props.notification.uuid).then(() => {
            props.onNavigate();
            router.push(`/guna/${props.notification.data.postSlug}#${props.notification.data.commentUuid}`);
        })
    }

    return <div className={'flex flex-row'}>
        <button className={'btn btn-link px-1'} style={{paddingLeft: '0.5rem', paddingRight: '0.5rem'}}
                onClick={navigate}>
            <div className={'flex flex-row'}>
                <div className="flex-grow flex flex-row">

                    <div className={'pr-2'}>
                        <div className="rounded-full bg-light-gray w-8 h-8 flex justify-center items-center">
                            <FontAwesomeIcon icon={faComment}/>
                        </div>
                    </div>
                    <div className={'text-left leading-snug'}>
                        {
                            notification.data.type === 'App\\Models\\Post' ?
                                <p className="font-bold mb-1">Nov komentar na tvoj prispevek!</p> :
                                <p className="font-bold mb-1">Nov komentar na tvoj komentar!</p>
                        }

                        <AuthorMeta author={notification.data.author} updatedAt={notification.updatedAt}
                                    createdAt={notification.createdAt}/>
                    </div>
                </div>

            </div>
        </button>
        <div className={'mt-2'}>
            {
                !notification.readAt ?
                    <button onClick={() => readNotification(notification.uuid)} className="btn btn-link">
                        <div className="h-2.5 w-2.5 bg-red rounded-full"/>
                    </button> : null
            }

        </div>
    </div>
}
