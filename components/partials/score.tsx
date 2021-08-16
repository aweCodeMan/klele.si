import {ScoreInterface} from "../../domain/score.interface";
import {AuthModalType, useAuth} from "../../contexts/auth";
import {useState} from "react";
import {PostService} from "../../helpers/post-service";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart as faHeartFull} from "@fortawesome/free-solid-svg-icons";
import {faHeart} from "@fortawesome/free-regular-svg-icons";

export default function Score(props: { score: ScoreInterface, type: string, uuid: string, voted?: number | null, horizontal: boolean | null }) {
    const auth = useAuth();
    const [votes, setVotes] = useState(props.score.votes);
    const [voted, setVoted] = useState(props.voted ?? 0);

    const voteNeutral = () => {
        setVotes(votes - voted);
        setVoted(0);

        PostService.vote({type: props.type, uuid: props.uuid, vote: 0})
            .then((response: any) => {
            });
    }

    const upvote = () => {
        setVotes(votes + 1);
        setVoted(1);

        PostService.vote({type: props.type, uuid: props.uuid, vote: 1})
            .then((response: any) => {
            });
    }

    const vote = () => {
        if (auth.user) {
            voted > 0 ? voteNeutral() : upvote();
        } else {
            auth.openAuthModal(AuthModalType.LOGIN);
        }
    }

    return <button className={(voted ? 'text-red hover:text-black ' : 'text-black hover:text-red ') + (props.horizontal ? 'flex flex-row items-center' : '' )}
                   onClick={() => vote()} title="Glasuj">
        <div className={"text-lg leading-none " + (props.horizontal ? 'mr-2' : '' )}>
            <FontAwesomeIcon icon={voted ? faHeartFull : faHeart}/>
        </div>
        <span className="text-sm font-bold opacity-80 font-mono">{votes}</span>
    </button>;
}
