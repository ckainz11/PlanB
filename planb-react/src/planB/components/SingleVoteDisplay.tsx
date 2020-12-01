import React from "react";

import {Image} from "semantic-ui-react";
import {usePersonalService} from "../services";

export const SingleVoteDisplay = ({userID, voteValue}: SingleVoteDisplayProps) => {

    const [me] = usePersonalService();

    return <div className={"single-vote-display"}>
            <Image size={"mini"} avatar src={me?.photoUrl}/>
            <div className={"single-vote-square"}/>
    </div>
}

type SingleVoteDisplayProps = {
    userID: string
    voteValue: number
}