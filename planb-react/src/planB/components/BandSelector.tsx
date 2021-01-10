import React, {useContext, useState} from "react";
import {BandContext} from "../contexts";
import {useBandService, useMemberService, usePersonalService, useUserService} from "../services";
import {Band, User} from "../resources";
import {Button, Container} from "semantic-ui-react";
import {BandCreatePopup} from "./BandCreatePopup";

export const BandSelector = ({bands, selectBand, me}: BandSelectorProps) => {
    const [users] = useUserService()
    const [open, setOpen] = useState(false)
    const close = () => setOpen(false)

    return <div>
        <h2>Welcome back, {me.userName}!</h2>
        <h3>Select a band to get started</h3>
        <Button icon="plus" content="Create new Band" className="color-positive" onClick={() => setOpen(true)} />
        {bands.map(band => {
            return <Container className="band-display" key={band.dataBaseID} onClick={() => selectBand(band)}>
                <h2 className={"band-display-header"} >{band.name}</h2>
                <h3>Leader: {users?.find(user => user.dataBaseID === band.leader)?.userName}</h3>
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