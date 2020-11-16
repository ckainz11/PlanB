import React from "react";

import {Meeting} from "../../resources";
import {Button, Container, Segment} from "semantic-ui-react";
import {MeetingControls} from "./MeetingControls";
import {VoteDisplay} from "./VoteDisplay";

export const MeetingDisplay = ({meeting}: MeetingDisplayProps) => {



    return <Container className={"meeting-display"} inverted basic >
        <h1 className={"meeting-header"} >{meeting.dataBaseID}</h1>
        <MeetingControls meeting={meeting}/>


    </Container>


};

type MeetingDisplayProps = {
    meeting: Meeting;
}