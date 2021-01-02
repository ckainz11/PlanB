import React, {useContext, useState} from "react";
import {Button, Container, Divider, Form, FormField, FormGroup, Input, Modal} from "semantic-ui-react";
import {BandContext} from "../contexts";
import {useSongService} from "../services";
import {Song} from "../resources";

export const SongCreatePopup = ({open, close}: SongCreatePopupProps) => {

    const [band] = useContext(BandContext)
    const [songs, songOperation] = useSongService(band)
    const [song, setSong] = useState<Song>({} as Song)


    return <Modal open={open} onClose={() => close()} fluid closeIcon>
        <Modal.Header>Create a Song</Modal.Header>
        <Modal.Content>
                <Form>
                    <FormGroup>
                        <FormField>
                            <Input placeholder="Song name" onChange={(event, data) => setSong({...song, name: data.value})} />
                        </FormField>
                        <FormField>
                            <Input type="number" min={0} max={10} placeholder="Rating" onChange={((event, data) => setSong({...song, rating: Number(data.value)}))} />
                        </FormField>
                        <FormField>
                            <Input placeholder={"Reference"} onChange={(event, data) => setSong({...song, content: data.value})}/>
                        </FormField>
                    </FormGroup>
                </Form>
            <Divider/>
            <div className={"create-song-controls"} >
                <Button content="Cancel" icon="close" onClick={() => close()} />
                <Button content={"Add"} icon="check" onClick={() => {
                    songOperation({type: "add", payload: song})
                    close();
                }} />
            </div>
        </Modal.Content>
    </Modal>
}

type SongCreatePopupProps = {
    open: boolean
    close: () => void
}