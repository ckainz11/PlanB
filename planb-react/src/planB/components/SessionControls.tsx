import React, {useContext, useState} from "react";
import {Button, Container} from "semantic-ui-react";
import {Session, Vote} from "../resources";
import {usePersonalService} from "../services";
import {BandContext} from "../contexts";
import {useVoteService} from "../services/serviceControllers/useVoteService";
import {SessionViewPopup} from "./SessionViewPopup";

export const SessionControls = ({session}: MeetingControlsProps) => {
    const [me] = usePersonalService()
    const [band] = useContext(BandContext)
    const [vote, voteOperation] = useVoteService(me, band, session)
    const [open, setOpen] = useState(false)

    const close = () => setOpen(false)


    return     <div className={"meeting-controls"}>
        <Button inverted icon="list" basic onClick={() => setOpen(true)} />
        <div className={"meeting-date-info"} >
            <h5>{session.start.toLocaleDateString()}, {session.start.toLocaleTimeString()}-{session.end.toLocaleTimeString()}</h5>
        </div>
        <div className={"meeting-vote-controls"}>
            {vote?.value !== 1 && <Button  className={"color-positive"} icon="check" onClick={()=> voteOperation({payload: {value: 1} as Vote, type: "add"})} /> }
            {vote?.value !== -1 && <Button className={"color-negative"} icon="close" onClick={()=> voteOperation({payload: {value: -1} as Vote, type: "add"})}/>}
        </div>
       {open && <SessionViewPopup open={open} close={close} session={session}/>}
    </div>

}

type MeetingControlsProps = {
    session: Session;
}
