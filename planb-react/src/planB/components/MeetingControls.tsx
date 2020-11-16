import React from "react";
import {Button, Container} from "semantic-ui-react";
import {Meeting} from "../../resources";

export const MeetingControls = ({meeting}: MeetingControlsProps) => {

    return     <div className={"meeting-controls"}>
        <Button inverted icon="list" basic/>
        <div className={"meeting-date-info"} >
            <h5>{meeting.date}, {meeting.start}-{meeting.end}</h5>
        </div>
        <div className={"meeting-vote-controls"}>
            <Button className={"meeting-vote-yes"} icon="check" />
            <Button className={"meeting-vote-no"} icon="close" />
        </div>
    </div>

}

type MeetingControlsProps = {
    meeting: Meeting;
}