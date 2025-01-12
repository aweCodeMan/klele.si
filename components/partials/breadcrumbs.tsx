import Link from 'next/link';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faChevronRight, faChevronLeft} from "@fortawesome/free-solid-svg-icons";

export default function Breadcrumbs(props: any) {

    return (
        <>
            <Link href="/" className="btn btn-link btn-sm text-red">
                    <FontAwesomeIcon icon={faChevronLeft}/> Nazaj na prispevke
            </Link>
        </>
    );
}
