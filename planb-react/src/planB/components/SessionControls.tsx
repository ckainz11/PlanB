import React from "react";
import {Button, Container} from "semantic-ui-react";
import {Session} from "../resources";

export const SessionControls = ({meeting}: MeetingControlsProps) => {

    return     <div className={"meeting-controls"}>
        <Button inverted icon="list" basic/>
        <div className={"meeting-date-info"} >
            <h5>{meeting.start.getDate()}, {meeting.start.getTime()}-{meeting.end.getTime()}</h5>
        </div>
        <div className={"meeting-vote-controls"}>
            <Button className={"color-positive"} icon="check" />
            <Button className={"color-negative"} icon="close" />
        </div>
    </div>

}

type MeetingControlsProps = {
    meeting: Session;
}
