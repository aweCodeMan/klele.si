import {GroupInterface} from "../../domain/group.interface";

export default function Group(props: { group: GroupInterface }) {
    return <a style={{color: props.group.color}} title={props.group.name}
              href={`/?groupUuid=${props.group.uuid}&page=1`}
              className={'text-sm font-bold leading-snug tracking-wide'}>
        #{props.group.name}
    </a>
}
