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
                {props.response.meta.currentPage > 1 ? <button className="btn btn-pagination" onClick={(e) => previous(e)}><FontAwesomeIcon icon={faChevronLeft}/></button> : null}
                {props.response.meta.currentPage > 1 ? <button className="btn btn-pagination ml-2" onClick={(e) => previous(e)}>{props.response.meta.currentPage - 1}</button> : null}
                <button className="btn btn-pagination mx-2 selected">{props.response.meta.currentPage}</button>
                {props.response.meta.nextPageUrl ? <button className="btn btn-pagination mr-2" onClick={(e) => next(e)}>{props.response.meta.currentPage + 1}</button> : null}
                {props.response.meta.nextPageUrl ? <button className="btn btn-pagination" onClick={(e) => next(e)}><FontAwesomeIcon icon={faChevronRight}/></button> : null}
            </div>
        </>
    );
}
