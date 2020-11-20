import React, {useContext, useState} from "react";

import {Form, FormField, Input, Modal} from "semantic-ui-react";

import {useSessionService, useBandService, useUserService, usePersonalService} from "../../services";
import {BandContext} from "../../contexts";
import {Session} from "../../resources";
import DatePicker from "react-semantic-ui-datepickers/dist/pickers/basic";
import SemanticDatepicker from "react-semantic-ui-datepickers";

export const SessionCreatePopup = ({sessionName, open, closeModal}: SessionCreatePopupProps) => {

    const [session, setSession] = useState<Session>({} as Session);


    const [band, selectBand] = useContext(BandContext);

    const [sessions, addSession] = useSessionService(band);

    return <Modal open={open} onClose={() => closeModal()} closeIcon >
        <Modal.Content>
            <Form>
                <FormField>
                        <SemanticDatepicker inverted onChange={() => {}} />
                </FormField>
                <FormField>
                    <Input label="Session Name" />
                </FormField>
            </Form>
        </Modal.Content>

    </Modal>

}


type SessionCreatePopupProps = {
    sessionName: string;
    open: boolean;
    closeModal: () => void;
}