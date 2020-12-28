import React, {useState} from "react";
import {Form, Input, Modal} from "semantic-ui-react";
import {Band} from "../resources";
import {usePersonalService} from "../services";


export const BandCreatePopup = ({open, onClose}: BandCreatePopupProps) => {
    const [me] = usePersonalService()
    const [newBand, setNewBand] = useState<Band>({leader: me ? me.dataBaseID : ""} as Band)


    return <Modal open={open} onClose={()=>onClose()} closeIcon>
        <Modal.Header>Create a new Band</Modal.Header>
        <Modal.Content>
            <Form>
                <Input  />
            </Form>




        </Modal.Content>



    </Modal>
}

type BandCreatePopupProps = {
    open: boolean
    onClose: () => void
}