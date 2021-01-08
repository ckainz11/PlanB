import React, {useContext, useState} from "react";
import {
    Button,
    Container,
    Divider,
    Form,
    FormField,
    FormGroup,
    Input,
    InputOnChangeData,
    Modal
} from "semantic-ui-react";
import {BandContext} from "../contexts";
import {useSongService} from "../services";
import {Song} from "../resources";

export const SongCreatePopup = ({open, close}: SongCreatePopupProps) => {

    const [band] = useContext(BandContext)
    const [songs, songOperation, validateSong] = useSongService(band)
    const [song, setSong] = useState<Song>({} as Song)


    const onChange = (event: any, {value}: InputOnChangeData) => {
        let num = Number(value)
        if(num >= 0 && num <= 10)
            setSong({...song, rating: num})
    }

    return <Modal open={open} onClose={() => close()} fluid closeIcon>
        <Modal.Header>Create a Song</Modal.Header>
        <Modal.Content>
                <Form>
                    <FormGroup>
                        <FormField width={7}>
                            <Input placeholder="Song name" onChange={(event, data) => setSong({...song, name: data.value})} />
                        </FormField>
                        <FormField width={2}>
                            <Input type="text" value={song.rating ? song.rating : 0} min={0} max={10}
                                   placeholder="Rating" onChange={(event, data) => onChange(event, data)}/>
                        </FormField>
                        <FormField width={7}>
                            <Input placeholder={"Reference"} onChange={(event, data) => setSong({...song, content: data.value})}/>
                        </FormField>
                    </FormGroup>
                </Form>
            <Divider/>
            <div className={"create-song-controls"} >
                <Button className={"color-negative"} content="Cancel" icon="close" onClick={() => close()} />
                <Button className={"color-positive"} content={"Add"} icon="check" onClick={async () => {
                    const promise = await songOperation({type: "add", payload: song})
                    console.log("Rating: "+ song.rating)
                    console.log("Validate: "+validateSong(song))
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