export default function Author(props: { author: any, avatar: boolean }) {
    return (
        <>
            {
                props.avatar ?

                    (<div className={'flex flex-row items-center justify-center'}>
                        <div className="bg-gray h-7 w-7 rounded-full mr-2"/>
                        <div className={'text-sm text-black opacity-80'}>
                            <span className="text-black font-bold">{props.author.name}</span>
                        </div>
                    </div>)

                    :

                    (<span className="text-sm text-black opacity-80">
            {props.author.name}
                </span>)
            }

        </>
    )
}
