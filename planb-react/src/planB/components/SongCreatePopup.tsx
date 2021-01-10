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
const sleep = (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}
export const SongCreatePopup = ({open, close}: SongCreatePopupProps) => {

    const [band] = useContext(BandContext)
    const [songs, songOperation, validateSong] = useSongService(band)
    const [song, setSong] = useState<Song>({} as Song)
    const [creating, setCreating] = useState(false)

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
                            <Input type="number" value={song.rating ? song.rating : 0} min={0} max={10}
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
                <Button className={"color-positive"} loading={creating} content={"Add"} icon="check" onClick={async () => {
                    setCreating(true)
                    await sleep(500)
                    const promise = await songOperation({type: "add", payload: song})
                    setCreating(false)
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