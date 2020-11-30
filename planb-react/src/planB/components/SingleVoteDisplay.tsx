import React from "react";

import {Image} from "semantic-ui-react";
import {usePersonalService} from "../services";

export const SingleVoteDisplay = ({userID, voteValue}: SingleVoteDisplayProps) => {

    const [me] = usePersonalService();

    return <div className={"single-vote-display"}>
        <div>
            <Image size={"mini"} avatar src={me?.photoUrl}></Image>
            <div className={"single-vote-square"}/>
        </div>
    </div>
}

type SingleVoteDisplayProps = {
    userID: string
    voteValue: number
}