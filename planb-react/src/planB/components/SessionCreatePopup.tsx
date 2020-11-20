import React, {useContext, useState} from "react";

import {Button, Form, FormField, Input, Modal} from "semantic-ui-react";
import SemanticDatepicker from "react-semantic-ui-datepickers";

import {BandContext} from "../contexts";
import {Session} from "../resources";

import {useSessionService} from "../services";

export const SessionCreatePopup = ({sessionName, open, closeModal}: SessionCreatePopupProps) => {

    const [session, setSession] = useState<Session>({} as Session);

    const [band, selectBand] = useContext(BandContext);

    const [sessions, addSession] = useSessionService(band);

    return <Modal open={open} onClose={() => closeModal()} closeIcon >
        <Modal.Content>
            <Form>
                <FormField>
                        <SemanticDatepicker inverted onChange={(event, data) => { data.value && setSession({...session, date: data.value as Date}) }} />
                </FormField>
                <FormField>
                    <Input label="Session Name" placeholder={sessionName} />
                </FormField>
                <Button content={"Create!"}  />
            </Form>
        </Modal.Content>

    </Modal>

}


type SessionCreatePopupProps = {
    sessionName: string;
    open: boolean;
    closeModal: () => void;
}