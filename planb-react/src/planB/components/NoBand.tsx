import React, {useContext, useState} from "react";
import {Button, Container} from "semantic-ui-react";
import {BandContext} from "../contexts";
import {BandCreatePopup} from "./BandCreatePopup";
import {usePersonalService} from "../services";

export const NoBand = () => {

    const [open, setOpen] = useState(false)
    const [band, selectBand] = useContext(BandContext)
    const [me] = usePersonalService()
    const close = () => setOpen(false)

    return <Container>
        <h1>Looks like you are not in a band</h1>
        <h2>Ask your band to add you or get started by creating a band</h2>
        <Button className="color-positive" icon="plus" content="Create a new Band" onClick={() => setOpen(true)}/>
        {open && <BandCreatePopup open={open} onClose={close} selectBand={selectBand} me={me!!}/>}
    </Container>
}