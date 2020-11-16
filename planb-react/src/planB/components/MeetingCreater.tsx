import React, {useState} from "react";
import {Button, Input} from "semantic-ui-react";

export const MeetingCreater = () => {

    const [meetingName, setMeetingName] = useState<string>("");

    return <Input type={"text"} inverted placeholder={"Enter a name..."} action={
        <Button
            className={"color-positive"}
            content={"Create!"}

        />
    }
                  onChange={(event, data) => setMeetingName(data.value)}
    />

}