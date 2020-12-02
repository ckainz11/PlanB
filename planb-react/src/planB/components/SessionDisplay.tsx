import React from "react";

import {Session} from "../resources";
import {Container} from "semantic-ui-react";
import {SessionControls} from "./SessionControls";
import {VoteDisplay} from "./VoteDisplay";


export const SessionDisplay = ({session}: MeetingDisplayProps) => {


    return <Container className={"meeting-display"} inverted basic>
        <h1 className={"meeting-header"}>{session.name}</h1>
        <VoteDisplay session={session} />
        <SessionControls session={session}/>

    </Container>


};

type MeetingDisplayProps = {
    session: Session;
}
