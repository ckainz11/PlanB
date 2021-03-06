import * as React from 'react'
import {Dropdown, Image, Input, Menu} from "semantic-ui-react";
import {useBandService, useMemberService, usePersonalService} from "../services";
import {useContext, useState} from "react";
import {BandContext} from "../contexts";
import {BandCreatePopup} from "./BandCreatePopup";
import {BandEditPopup} from "./BandEditPopup";

export const HeaderMenu = () => {
    const [me, signOut] = usePersonalService();
    const [bands, bandOperation] = useBandService(me);
    const [band, setSelectedBand] = useContext(BandContext);
    const [members, memberOperation] = useMemberService(band);

    const [createOpen, setCreateOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const closeCreate = () => setCreateOpen(false);
    const closeEdit = () => setEditOpen(false);
    const leader = me?.dataBaseID === band?.leader;

    return <div className={"custom-menu"}>
        <Menu size={"large"} secondary>
            <Dropdown item
                      className={"selectBand"}
                      loading={bands ? bands.length === 0 : true}
                      disabled={bands ? bands.length === 0 : true}
                      placeholder={"Bands"}>
                <Dropdown.Menu>
                    {bands?.map(band => {
                        return <Dropdown.Item key={band.dataBaseID} onClick={() => {
                            setSelectedBand(band)
                        }}>{band.name}</Dropdown.Item>
                    })}
                </Dropdown.Menu>
            </Dropdown>
            <Dropdown className="purple-input" item placeholder={"Account"}>
                <Dropdown.Menu>
                    {band && <Dropdown.Header>{band.name}</Dropdown.Header>}
                    {band && <Dropdown.Item icon={leader ? "edit" : "eye"} text={leader ? "Edit Band" : "View Band"}
                                            onClick={() => setEditOpen(true)}/>}
                    {band && !leader && <Dropdown.Item icon={"sign out"} text={"Leave Band"} onClick={async () => {
                        await memberOperation({type: "remove", payload: me!!});
                        setSelectedBand(undefined)
                    }}/>}
                    {band && leader && <Dropdown.Item icon={"trash"}  text={"Delete Band"} onClick={async () => {
                        await bandOperation({type: "remove", payload: band});
                        setSelectedBand(undefined)
                    }}/>}
                    {band && <Dropdown.Divider/>}
                    <Dropdown.Header>Account</Dropdown.Header>
                    <Dropdown.Item icon={"plus"} text={"Create Band"} onClick={() => setCreateOpen(true)}/>
                    <Dropdown.Item icon={"sign out"} text={"Log out"} onClick={() => {
                        signOut({type: "signOut"})
                    }}/>
                </Dropdown.Menu>
            </Dropdown>
            <Menu.Item>
                <Image size={"mini"} src={me?.photoUrl} avatar/>
            </Menu.Item>
        </Menu>
        {createOpen &&
        <BandCreatePopup open={createOpen} onClose={closeCreate} selectBand={setSelectedBand} me={me!!}/>}
        {editOpen && <BandEditPopup open={editOpen} leader={leader} close={closeEdit} band={band!!} me={me!!}
                                    selectBand={setSelectedBand}/>}

    </div>

}

