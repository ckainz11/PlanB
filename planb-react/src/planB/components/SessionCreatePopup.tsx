import React, {useContext, useState} from "react";

import {Button, Form, FormField, FormGroup, Input, Modal} from "semantic-ui-react";

import {BandContext} from "../contexts";
import {Session} from "../resources";

import {useSessionService} from "../services";
import {DateInput, TimeInput} from "semantic-ui-calendar-react";



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


    const handleDateInput = (event: any, {value}: any) => {
        selectDate(value);
    }
    const handleTimeInput = (event: any, {value, name}: any) => {
        if (name == "start")
            setStartTime(value);
        else
            setEndTime(value);
    }


    const pushSession = () => {
        const finalSession: Session = {
            ...session,
            start: parseDateString(date, startTime),
            end: parseDateString(date, endTime),
            description: "cooler test yayayaya",
            location: "Proberaum Naschmarkt"
        };

        console.log(JSON.stringify(finalSession));

        sessionOperation({type:"add", payload:finalSession})

    }


    return <Modal open={open} onClose={() => closeModal()} closeIcon>
        <Modal.Content>
            <Form>
                <FormField>
                    <Input placeholder={sessionName} onChange={(event, data) => {
                        setSession({...session, name: data.value})
                    }}/>
                </FormField>
                <FormField>
                    <DateInput inline name="date" value={date} onChange={handleDateInput}/>
                </FormField>
                <FormGroup>
                    <FormField>
                        <TimeInput value={startTime} name={"start"} onChange={handleTimeInput}/>
                    </FormField>
                    <FormField>
                        <TimeInput value={endTime} name={"end"} onChange={handleTimeInput}/>
                    </FormField>
                </FormGroup>

                <Button className={"color-positive"} content={"Create!"} onClick={() => pushSession()}/>
            </Form>
        </Modal.Content>

    </Modal>

}


type SessionCreatePopupProps = {
    sessionName: string;
    open: boolean;
    closeModal: () => void;
}
