import React, {useState} from "react";

import {Session} from "../resources";
import {Container} from "semantic-ui-react";
import {SessionControls} from "./SessionControls";
import {VoteDisplay} from "./VoteDisplay";
import {useSongService} from "../services";
import {SessionViewPopup} from "./SessionViewPopup";


const getRandomColour = () => {
    const colour = Math.floor(Math.random() * 5)
    switch (colour){
        case 1: return "col1";
        case 2: return "col2";
        case 3: return "col3";
        case 4: return "col4";
        case 5: return "col5";
    }
}

export const SessionDisplay = ({session}: MeetingDisplayProps) => {



    return <Container className={"meeting-display"}>
        <h1 className={"meeting-header "+getRandomColour()}>{session.name}</h1>
        <VoteDisplay session={session} />
        <SessionControls session={session}/>
    </Container>


};

type MeetingDisplayProps = {
    session: Session;
}
