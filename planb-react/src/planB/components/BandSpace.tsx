import React, {useContext, useState} from "react";
import {Button, Divider} from "semantic-ui-react";
import {SessionCreater} from "./SessionCreater";
import {SessionDisplay} from "./SessionDisplay";
import {usePersonalService, useSessionService} from "../services";
import {BandContext} from "../contexts";
import {BandCreatePopup} from "./BandCreatePopup";
import {BandEditPopup} from "./BandEditPopup";

export const BandSpace = () => {

    const [me] = usePersonalService();
    const [currentBand, selectBand] = useContext(BandContext);
    const [sessions] = useSessionService(currentBand);

    const [createOpen, setCreateOpen] = useState(false)
    const createOnClose = () => {
        setCreateOpen(false)
    };
    const [editOpen, setEditOpen] = useState(false)
    const editOnClose = () => {
        setEditOpen(false)
    }




    if (me) {
        return <div>
            <h3>Hey, {me?.userName}! Here are your next scheduled sessions</h3>
            <Divider/>
            <SessionCreater/>
            <br/>
            <Button primary onClick={()=>setCreateOpen(true)} >Create new Band</Button>
            <Button primary onClick={()=>setEditOpen(true)}>Edit selected Band</Button>
            {createOpen && <BandCreatePopup open={createOpen} me={me} selectBand={selectBand} onClose={createOnClose}/>}
            {editOpen && <BandEditPopup open={editOpen} onClose={editOnClose} band={currentBand!!} me={me}/>}
            {sessions?.map(session => {
                return <SessionDisplay session={session} key={session.dataBaseID}/>
            })}
        </div>
    } else {
        return <p>loading...</p>
    }
}
