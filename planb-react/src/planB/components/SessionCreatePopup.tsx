import React, {useContext, useState} from "react";

import {Button, Form, FormField, FormGroup, Input, Modal} from "semantic-ui-react";
import SemanticDatepicker from "react-semantic-ui-datepickers";

import {BandContext} from "../contexts";
import {Session} from "../resources";

import {useSessionService} from "../services";

const convertToDatabaseID = (name: string): string => {
    return name.replace(" ", "_");
};

export const SessionCreatePopup = ({sessionName, open, closeModal}: SessionCreatePopupProps) => {

    const [session, setSession] = useState<Session>({} as Session);

    const [band, selectBand] = useContext(BandContext);

    const [sessions, addSession] = useSessionService(band);

    return <Modal open={open} onClose={() => closeModal()} closeIcon >
        <Modal.Content>
            <Form>
                <FormField>
                    <Input label="Session Name" placeholder={sessionName} onChange={(event, data) => {setSession({...session, dataBaseID: convertToDatabaseID(data.value)})}} />
                </FormField>
                <FormGroup widths={"equal"} >
                    <FormField control={SemanticDatepicker} label={"Date"} onChange={(value: Date) => {value && setSession({...session, date:value})}} />
                    <FormField control={Input} label={"From"} />
                    <FormField control={Input} label={"To"}  />
                </FormGroup>

                <Button content={"Create!"} onClick={() => console.log(session.date)}  />
            </Form>
        </Modal.Content>

    </Modal>

}


type SessionCreatePopupProps = {
    sessionName: string;
    open: boolean;
    closeModal: () => void;
}