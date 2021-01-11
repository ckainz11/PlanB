import React, {useContext, useState} from "react";

import {
    Button,
    Divider,
    Dropdown,
    Form,
    FormField,
    FormGroup,
    Input,
    Message,
    Modal,
    TextArea
} from "semantic-ui-react";

import {BandContext} from "../contexts";
import {CustomError, Session, Song} from "../resources";

import {useAssignSongService, useSessionService, useSongService} from "../services";
import {DateInput, TimeInput} from "semantic-ui-calendar-react";
import {SongTable} from "./SongTable";


const parseDateString = (date: string, time: string): Date => {
    const dateSplit: string[] = date.split("-");
    const day = Number.parseInt(dateSplit[0]);
    const month = Number.parseInt(dateSplit[1]);
    const year = Number.parseInt(dateSplit[2]);

    const timeSplit: string[] = time.split(":");
    const hour = Number.parseInt(timeSplit[0]);
    const minute = Number.parseInt(timeSplit[1]);

    return new Date(year, month - 1, day, hour, minute);
};


export const SessionCreatePopup = ({sessionName, open, closeModal}: SessionCreatePopupProps) => {

    const [session, setSession] = useState<Session>({name: sessionName, description: ""} as Session);
    const [date, selectDate] = useState<string>("");
    const [startTime, setStartTime] = useState<string>("");
    const [endTime, setEndTime] = useState<string>("");

    const [band, selectBand] = useContext(BandContext);

    const [sessions, sessionOperation, validateSession] = useSessionService(band);
    const [songs, songOperation] = useAssignSongService(band, session)
    const [allSongs, allSongOperation] = useSongService(band)
    const [tempSongs, setTempSongs] = useState<String[]>([])
    const [errors, setErrors] = useState<CustomError[]>([]);


    const handleDateInput = (event: any, {value}: any) => {
        selectDate(value);
    }
    const handleTimeInput = (event: any, {value, name}: any) => {
        if (name === "start")
            setStartTime(value);
        else
            setEndTime(value);
    }
    const options = allSongs?.map(s => {
        return {
            key: s.dataBaseID,
            text: s.name,
            value: s.dataBaseID
        }
    })


    const getSongs = (): Song[] => {
        const displaySongs: Song[] = []
        tempSongs.forEach(id =>
            displaySongs.push(allSongs?.find(s => id === s.dataBaseID) as Song)
        )
        return displaySongs
    }

    const pushSession = async () => {
        const finalSession: Session = {
            ...session,
            start: parseDateString(date, startTime),
            end: parseDateString(date, endTime),
        };
        const res = await sessionOperation({
            type: "addWithSongs", payload: {
                session: finalSession,
                songs: tempSongs.map((e) => {
                    return {dataBaseID: e} as Song
                })
            }
        })
    }

    const containsError = (field: string) => {
        for(let e of errors){
            if(e.field === field)
                return e
        }
        return undefined
    }

    return <Modal open={open} onClose={() => closeModal()} closeIcon>
        <Modal.Header>Session Creation</Modal.Header>
        <Modal.Content>
            <Form>
                <FormField  error={containsError("name")}>
                    <Input  defaultValue={sessionName} placeholder={"Name"} onChange={(event, data) => {
                        setSession((oldValue) => {
                            return {...session, name: data.value}
                        })
                    }}/>
                </FormField>
                <label>Choose a date</label>
                <FormField >
                    <DateInput minDate={new Date()} inline name="date" value={date} onChange={handleDateInput}/>
                    {containsError("date") && <Message error={true} header={"Error"} content={"Please select a valid date"} />}
                </FormField>
                <FormGroup widths={"equal"}>
                    <FormField error={containsError("start")}>
                        <TimeInput  value={startTime} name={"start"} onChange={handleTimeInput}/>
                    </FormField>
                    <FormField error={containsError("end")}>
                        <TimeInput value={endTime} name={"end"} onChange={handleTimeInput}/>
                    </FormField>
                    <FormField error={containsError("location")} >
                        <Input onChange={((event, data) => {
                            setSession({...session, location: data.value})
                        })}/>
                    </FormField>
                </FormGroup>
                <h3>Description</h3>
                <label>{session.description.length}/2000</label>
                <FormField error={containsError("description")}>
                    <TextArea onChange={(event, data) => {
                        setSession({...session, description: data.value as string})
                    }}/>
                </FormField>
                <FormField error={containsError("songs")}>
                    <Dropdown options={options || []} selection search multiple fluid onChange={((event, data) => {
                        const newSongs = data.value as []
                        setTempSongs(newSongs)
                    })}/>
                </FormField>
                {tempSongs.length > 0 && <SongTable songs={getSongs()}/>}
                <Divider/>
                <Button className={"color-positive"} content={"Create!"} onClick={() => {
                    const errors = validateSession(session)
                    if (errors.length === 0) {
                        pushSession();
                        closeModal();
                    }
                    else
                        setErrors(errors)
                    console.log(errors);
                }}/>
            </Form>
        </Modal.Content>

    </Modal>

}


type SessionCreatePopupProps = {
    sessionName: string;
    open: boolean;
    closeModal: () => void;
}
