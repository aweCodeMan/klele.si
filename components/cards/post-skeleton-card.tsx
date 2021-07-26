import Link from 'next/link'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faHeart} from '@fortawesome/free-regular-svg-icons'
import {faComments, faShareAlt} from "@fortawesome/free-solid-svg-icons";
import Shimmer from "../partials/shimmer";

export default function PostSkeletonCard() {
    return (
        <div className={'card'}>
            <div className="flex flex-row">
                <div style={{width: '1.5rem'}} className={'mr-2'}>
                    <Shimmer height={'2rem'}/>
                </div>
                <div className="flex-1 flex flex-col">
                    <div className="mb-3">
                        <Shimmer/>
                    </div>
                    <div className="mb-3">
                        <Shimmer/>
                    </div>
                    <div className="mb-3">
                        <Shimmer width={'65%'}/>
                    </div>
                    <div className="mb-3">
                        <Shimmer width={'65%'}/>
                    </div>
                    <Shimmer width={'80%'}/>
                </div>
            </div>
        </div>
    )
}
