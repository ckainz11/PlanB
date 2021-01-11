import React, {useContext, useState} from "react";

import {Button, Divider, Dropdown, Form, FormField, FormGroup, Input, Modal, TextArea} from "semantic-ui-react";

import {BandContext} from "../contexts";
import {Session, Song} from "../resources";

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

    const [session, setSession] = useState<Session>({name: sessionName} as Session);
    const [date, selectDate] = useState<string>("");
    const [startTime, setStartTime] = useState<string>("");
    const [endTime, setEndTime] = useState<string>("");

    const [band, selectBand] = useContext(BandContext);

    const [sessions, sessionOperation] = useSessionService(band);
    const [songs, songOperation] = useAssignSongService(band, session)
    const [allSongs, allSongOperation] = useSongService(band)
    const [tempSongs, setTempSongs] = useState<String[]>([])

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


    const getDisabledDates = (): string[] => {
        const dates: string[] = []
        const today = new Date()
        const year = today.getFullYear()
        const month = today.getMonth()
        const day = today.getDay()
        for(let i = 1; i < day; i++){
            dates.push(i+"-"+month+"-"+year)
        }
        console.log(dates)
        return dates
    }

    const getSongs = (): Song[] => {
        const displaySongs: Song[] = []
        tempSongs.forEach(id =>
            displaySongs.push(allSongs?.find(s => id === s.dataBaseID) as Song)
        )
        return displaySongs
    }

    const pushSession = async() => {
        const finalSession: Session = {
            ...session,
            start: parseDateString(date, startTime),
            end: parseDateString(date, endTime),
        };
        const res = await sessionOperation({type:"addWithSongs", payload:{
            session: finalSession,
            songs: tempSongs.map((e) => {
                return {dataBaseID: e} as Song
            })
        }})
    }

    return <Modal open={open} onClose={() => closeModal()} closeIcon>
        <Modal.Header>Session Creation</Modal.Header>
        <Modal.Content>
            <Form>
                <FormField>
                    <Input defaultValue={sessionName} placeholder={"Name"} onChange={(event, data) => {
                        setSession((oldValue) => {return {...session, name: data.value}})
                    }}/>
                </FormField>
                <FormField>
                    <DateInput disable={getDisabledDates()} inline name="date" value={date} onChange={handleDateInput}/>
                </FormField>
                <FormGroup widths={"equal"} >
                    <FormField>
                        <TimeInput value={startTime} name={"start"} onChange={handleTimeInput}/>
                    </FormField>
                    <FormField>
                        <TimeInput value={endTime} name={"end"} onChange={handleTimeInput}/>
                    </FormField>
                    <FormField>
                        <Input onChange={((event, data) => {setSession({...session, location: data.value})})} />
                    </FormField>
                </FormGroup>
                <FormField>
                    <TextArea onChange={(event, data) => {setSession({...session, description: data.value as string})}} />
                </FormField>
                <FormField>
                    <Dropdown options={options || []} selection search multiple fluid onChange={((event, data) => {
                        const newSongs = data.value as []
                        setTempSongs(newSongs)
                    })} />
                </FormField>
                {tempSongs.length > 0 && <SongTable songs={getSongs()}/>}
                <Divider/>
                <Button className={"color-positive"} content={"Create!"} onClick={() => {
                    pushSession();
                    closeModal();
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
