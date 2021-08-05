import Shimmer from "../partials/shimmer";

export default function CommentSkeletonCard() {
    return (
        <div className={'mb-6'}>
            <div className="flex flex-row">
                <div style={{width: '1.5rem'}} className={'mr-2'}>
                    <Shimmer height={'2rem'}/>
                </div>
                <div className="flex-1 flex flex-col">
                    <div className="mb-3">
                        <Shimmer/>
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
