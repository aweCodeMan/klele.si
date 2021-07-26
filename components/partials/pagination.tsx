import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faChevronRight, faChevronLeft} from "@fortawesome/free-solid-svg-icons";

export default function Pagination(props: {
    response: { meta: any, data: any },
    onPageChange: Function,
}) {

    const previous = (e: any) => {
        e.preventDefault();
        props.onPageChange(props.response.meta.currentPage - 1);
    }

    const next = (e: any) => {
        e.preventDefault();
        props.onPageChange(props.response.meta.currentPage + 1);
    }

    return (
        <>
            <div className="flex flex-row justify-center">
                {props.response.meta.currentPage > 1 ?
                <button className="btn btn-outline" onClick={(e) => previous(e)}><FontAwesomeIcon icon={faChevronLeft}/></button> : null}
                <button className="btn btn-primary mx-2" disabled={true}>{props.response.meta.currentPage}</button>
                {props.response.meta.nextPageUrl ? <button className="btn btn-outline" onClick={(e) => next(e)}><FontAwesomeIcon icon={faChevronRight}/></button> : null}
            </div>
        </>
    );
}
