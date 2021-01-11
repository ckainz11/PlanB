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
import {CustomError, Song} from "../resources";
import {CustomErrorComponent} from "./CustomErrorComponent";

const sleep = (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}
export const SongCreatePopup = ({open, close}: SongCreatePopupProps) => {

    const [band] = useContext(BandContext)
    const [songs, songOperation, validateSong] = useSongService(band)
    const [song, setSong] = useState<Song>({rating: 0} as Song)
    const [creating, setCreating] = useState(false)
    const [errors, setErrors] = useState<CustomError[]>([]);

    const onChange = (event: any, {value}: InputOnChangeData) => {
        let num = Number(value)
        if (num >= 0 && num <= 10)
            setSong({...song, rating: num})
    }

    const containsError = (field: string) => {
        for (let e of errors) {
            if (e.field === field)
                return e
        }
        return undefined
    }

    return <Modal open={open} onClose={() => close()} fluid closeIcon>
        <Modal.Header className="edit-header">Create a Song</Modal.Header>
        <Modal.Content className="edit-content">
            <Form error>
                <FormGroup>
                    <FormField width={5}>
                        <Input error={!!containsError("name")} className="dark-input" placeholder="Song name"
                               onChange={(event, data) => setSong({...song, name: data.value})}/>
                        <br/>
                        <br/>
                        <CustomErrorComponent customError={containsError("name")}/>
                    </FormField>
                    <FormField width={4}>
                        <Input className="dark-input" error={!!containsError("rating")} type="number" value={song.rating ? song.rating : 0} min={0}
                               max={10}
                               placeholder="Rating" onChange={(event, data) => onChange(event, data)}/>
                        <br/>
                        <br/>
                        <CustomErrorComponent customError={containsError("rating")}/>
                    </FormField>
                    <FormField width={7}>
                        <Input error={!!containsError("content")} className="dark-input" placeholder={"Reference"}
                               onChange={(event, data) => setSong({...song, content: data.value})}/>
                        <br/>
                        <br/>
                        <CustomErrorComponent customError={containsError("content")}/>
                    </FormField>
                </FormGroup>
            </Form>
            <Divider/>
            <div className={"create-song-controls"}>
                <Button className={"color-negative"} content="Cancel" icon="close" onClick={() => close()}/>
                <Button className={"color-positive"} loading={creating} content={"Add"} icon="check"
                        onClick={async () => {
                            const errors = validateSong(song)
                            if (errors.length === 0) {
                                setCreating(true)
                                await sleep(500)
                                await songOperation({type: "add", payload: song})
                                setCreating(false)
                                close();
                            } else {
                                setErrors(errors)
                            }
                        }}/>
            </div>
        </Modal.Content>
    </Modal>
}

type SongCreatePopupProps = {
    open: boolean
    close: () => void
}
