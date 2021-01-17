import React, {useContext, useEffect, useState} from "react";

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
import {CustomErrorComponent} from "./CustomErrorComponent";
import moment from "moment";


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
    const [band, selectBand] = useContext(BandContext);
    const [sessions, sessionOperation, validateSession] = useSessionService(band);

    const [session, setSession] = useState<Session>({name: sessionName, description: ""} as Session);
    const [date, selectDate] = useState<string>(moment().format("DD-MM-YYYY"));
    const [startTime, setStartTime] = useState<string>("");
    const [endTime, setEndTime] = useState<string>("");

    const [touched, setTouched] = useState<boolean>(false)

    const [allSongs, allSongOperation] = useSongService(band)
    const [tempSongs, setTempSongs] = useState<String[]>([])
    const [errors, setErrors] = useState<CustomError[]>([]);
    useEffect(() => {
        if (touched) {
            const finalSession: Session = {
                ...session,
                start: parseDateString(date, startTime),
                end: parseDateString(date, endTime),
            };
            const newErrors = validateSession(finalSession)
            setErrors(newErrors)
        }
    }, [touched, setErrors, validateSession, session, date, endTime, startTime])

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

        setTouched(true)
        const errors = validateSession(finalSession)
        if (errors.length === 0) {
            const res = await sessionOperation({
                type: "addWithSongs", payload: {
                    session: finalSession,
                    songs: tempSongs.map((e) => {
                        return {dataBaseID: e} as Song
                    })
                }
            })
            closeModal();
        }
    }

    const containsError = (field: string) => {
        for (let e of errors) {
            if (e.field === field)
                return e
        }
        return undefined
    }

    return <Modal open={open} onClose={() => closeModal()} closeIcon>
        <Modal.Header className="edit-header">Session Creation</Modal.Header>
        <Modal.Content className={"edit-content"}>
            <Form error>
                <h3>Name</h3>
                <FormField error={containsError("name")}>
                    <Input className="dark-input" defaultValue={sessionName} placeholder={"Name"}
                           onChange={(event, data) => {
                               setSession((oldValue) => {
                                   return {...session, name: data.value}
                               })
                           }}/>
                </FormField>
                <CustomErrorComponent customError={containsError("name")}/>
                <h3>Choose a date</h3>
                <FormField>
                    <DateInput inline className="dark-input" placeholder="Date" minDate={new Date()} name="date"
                               value={date} onChange={handleDateInput}/>
                    <CustomErrorComponent customError={containsError("date")}/>
                </FormField>
                <FormGroup widths={"equal"}>
                    <FormField error={containsError("start")}>
                        <h4>Start Time</h4>
                        <TimeInput className="dark-input" placeholder="Start" value={startTime} name={"start"}
                                   onChange={handleTimeInput}/>
                        <br/>
                        <CustomErrorComponent customError={containsError("start")}/>
                    </FormField>
                    <FormField error={containsError("end")}>
                        <h4>End Time</h4>
                        <TimeInput className="dark-input" placeholder="End" value={endTime} name={"end"}
                                   onChange={handleTimeInput}/>
                        <br/>
                        <CustomErrorComponent customError={containsError("end")}/>
                    </FormField>
                    <FormField error={containsError("location")}>
                        <h4>Location</h4>
                        <Input className="dark-input" placeholder="Location" onChange={((event, data) => {
                            setSession({...session, location: data.value})
                        })}/>
                        <br/>
                        <br/>
                        <CustomErrorComponent customError={containsError("location")}/>
                    </FormField>
                </FormGroup>
                <h3>Description</h3>
                <FormField error={containsError("description")}>
                    <TextArea className="dark-textarea" placeholder="Description" onChange={(event, data) => {
                        setSession({...session, description: data.value as string})
                    }}/>
                    <label className="font-color-grey">{session.description.length}/2000</label>
                    <CustomErrorComponent customError={containsError("description")}/>
                </FormField>
                <FormField error={containsError("songs")}>
                    <h3>Add the songs you want to practice at this session</h3>
                    <Dropdown className="dark-dropdown" options={options || []} selection search multiple fluid
                              onChange={((event, data) => {
                                  const newSongs = data.value as []
                                  setTempSongs(newSongs)
                              })}/>
                </FormField>
                {tempSongs.length > 0 && <SongTable songs={getSongs()}/>}
                <Divider/>
                <Button className={"color-positive"} content={"Create!"} onClick={() => {
                    pushSession();
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
