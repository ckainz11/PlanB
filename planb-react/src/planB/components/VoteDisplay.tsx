import React, {useContext} from "react";
import {Session} from "../resources";
import {BandContext} from "../contexts";
import {useMemberService} from "../services";
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
