import React from "react";

import {Meeting} from "../../resources";
import {Segment} from "semantic-ui-react";

export const MeetingDisplay = ({meeting}: MeetingDisplayProps) => {



    return <Segment inverted basic >
        <h1>{meeting.name}</h1>
        <h1>{meeting.date}</h1>
    </Segment>


};

type MeetingDisplayProps = {
    meeting: Meeting;
}