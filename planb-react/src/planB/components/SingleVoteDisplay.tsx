import React, {useContext} from "react";

import {Image} from "semantic-ui-react";
import {usePersonalService} from "../services";
import {Session, User} from "../resources";
import {BandContext} from "../contexts";
import {useVoteService} from "../services/serviceControllers/useVoteService";

const getColor = (value: number) => {
    switch (value) {
        case 0: return "color-grey";
        case 1: return "color-positive";
        case -1: return "color-negative";
    }
}


export const SingleVoteDisplay = ({user, session}: SingleVoteDisplayProps) => {

    const [band] = useContext(BandContext);
    const [vote] = useVoteService(user, band, session);

    return <div className={"single-vote-display"}>
            <Image size={"mini"} avatar src={user.photoUrl}/>
            <div className={"single-vote-square " + getColor(vote?.value as number)}/>
    </div>
}

type SingleVoteDisplayProps = {
    user: User
    session: Session
}
