import React, {useState} from "react";
import {Button, Input} from "semantic-ui-react";
import {SessionCreatePopup} from "./SessionCreatePopup";

export const SessionCreater = () => {

    const [open, setOpen] = React.useState(false);


    const [sessionName, setSessionName] = useState<string>("");

    const close = () => {
        setOpen(false);
    }


    return <div>
        <Input type={"text"} inverted placeholder={"Enter a name..."}
               onChange={(event, data) => setSessionName(data.value)}
               onKeyDown={(e: { keyCode: number; }) => {
                   if (e.keyCode === 13) {
                       setOpen(true);
                   }
               }}
               action={
                   <Button
                       className={"color-positive"}
                       content={"Create!"}
                       onClick={event => {
                           setOpen(true);
                       }}
                   />
               }

        />
        {open && <SessionCreatePopup open={true} sessionName={sessionName} closeModal={close}/>}
    </div>


};
