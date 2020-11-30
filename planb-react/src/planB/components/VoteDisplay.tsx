import React, {useContext} from "react";
import {useVoteService} from "../services/serviceControllers/useVoteService";
import {Session, Vote} from "../resources";
import {BandContext} from "../contexts";
import {usePersonalService} from "../services";
import {SingleVoteDisplay} from "./SingleVoteDisplay";

export const VoteDisplay = ({session}:VoteDisplayProps) => {

    const [band] = useContext(BandContext);
    const [me] = usePersonalService()
    const [vote, setVote] = useVoteService(me, band, session);


    return <div>
        <SingleVoteDisplay userID={"test"} voteValue={1} />
    </div>

}

type VoteDisplayProps = {
    session: Session
}