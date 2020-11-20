import React from "react";

import {Session} from "../../resources";
import {Button, Container, Segment} from "semantic-ui-react";
import {SessionControls} from "./SessionControls";
import {VoteDisplay} from "./VoteDisplay";

export const SessionDisplay = ({meeting}: MeetingDisplayProps) => {



    return <Container className={"meeting-display"} inverted basic >
        <h1 className={"meeting-header"} >{meeting.dataBaseID}</h1>
        <SessionControls meeting={meeting}/>


    </Container>


};

type MeetingDisplayProps = {
    meeting: Session;
}