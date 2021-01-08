import React, {useContext, useState} from "react";
import {Button, Divider, Grid, Modal, Segment} from "semantic-ui-react";
import {Session, Song} from "../resources";
import {VoteDisplay} from "./VoteDisplay";
import {SongTable} from "./SongTable";
import {useAssignSongService, useSessionService, useSongService} from "../services";
import {BandContext} from "../contexts";
const sleep = (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}
export const SessionViewPopup = ({session, open, close}: SessionViewPopupProps) => {

    const [band] = useContext(BandContext)
    const [songs, songOperatoin] = useAssignSongService(band, session)
    const [sessions, sessionOperation] = useSessionService(band)
    const [deleting, setDeleting] = useState(false)



    return <Modal open={open} onClose={close} closeIcon>
        <Modal.Header className={"edit-header"}>
            {session.name}
        </Modal.Header>
        <Modal.Content className={"edit-content"}>
            <Segment basic>
                <h2>On {session.start.toDateString()} from {session.start.toLocaleTimeString()} until {session.end.toLocaleTimeString()}</h2>
                <Divider inverted/>
                <br/>
                <Grid columns={2}>
                    <Grid.Column width={14}>
                        <h3>Description</h3>
                        <p>{session.description}</p>
                        <h3>Location: {session.location}</h3>
                        {songs && songs?.length > 0 && <SongTable songs={songs as Song[]}/>}
                    </Grid.Column>
                    <Grid.Column width={2} className="session-view-votes">
                        <h3>Votes</h3>
                        <VoteDisplay vertical session={session}/>
                    </Grid.Column>
                </Grid>
                <br/>
                <Divider inverted/>
                <div className={"create-song-controls"}>
                    <Button className={"color-negative"} loading={deleting}  icon="trash" onClick={async () => {
                        setDeleting(true)
                        await sleep(500)
                        const p = await sessionOperation({type: "remove", payload: session})
                        setDeleting(false)
                        close()

                    }
                    } />
                    <Button className={"color-positive"} content="Done" icon="check" onClick={() => close()} />
                </div>
            </Segment>


        </Modal.Content>
    </Modal>

}
type SessionViewPopupProps = {
    open: boolean;
    close: () => void;
    session: Session;
}
