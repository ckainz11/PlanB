import React, {useContext, useState} from "react";
import {BandContext} from "../contexts";
import {useBandService, usePersonalService, useUserService} from "../services";
import {Band, User} from "../resources";
import {Button, Container} from "semantic-ui-react";
import {BandCreatePopup} from "./BandCreatePopup";

export const BandSelector = ({bands, selectBand, me}: BandSelectorProps) => {
    const [users] = useUserService()
    const [open, setOpen] = useState(false)
    const close = () => setOpen(false)


    return <div>
        <Button icon="plus" content="Create new Band" className="color-positive" onClick={() => setOpen(true)} />
        {bands.map(band => {
            return <Container className="band-display" basic inverted key={band.dataBaseID} onClick={() => selectBand(band)}>
                <h2>{band.name}</h2>
                <h4>Leader: {users?.find(user => user.dataBaseID === band.leader)?.userName}</h4>
                <pre>{band.description}</pre>
            </Container>
        })}
        {open && <BandCreatePopup open={open} onClose={close} selectBand={selectBand} me={me}/>}
    </div>
}
type BandSelectorProps = {
    bands: Band[]
    selectBand: (b: Band) => void
    me: User
}