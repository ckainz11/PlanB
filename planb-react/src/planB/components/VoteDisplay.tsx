import React, {useContext} from "react";
import {useVoteService} from "../services/serviceControllers/useVoteService";
import {Session, Vote} from "../resources";
import {BandContext} from "../contexts";
import {useMemberService, usePersonalService} from "../services";
import {SingleVoteDisplay} from "./SingleVoteDisplay";

export const VoteDisplay = ({session}:VoteDisplayProps) => {

    const [band] = useContext(BandContext);
    const [member] = useMemberService(band)


    return <div className={"vote-display-wrapper"} >
        {member?.map(m => {
          return  <SingleVoteDisplay user={m} session={session} key={m.dataBaseID} />
        })}

    </div>

}

type VoteDisplayProps = {
    session: Session
}