import * as React from 'react'
import {Dropdown, Image, Input, Menu} from "semantic-ui-react";
import {useBandService, useMemberService, usePersonalService} from "../services";
import {useContext} from "react";
import {BandContext} from "../contexts";

export const HeaderMenu = () => {


    const [me, signOut] = usePersonalService();

    const [bands, bandOperation] = useBandService(me);

    const [selectedBand, setSelectedBand] = useContext(BandContext);
    const [members, memberOperation] = useMemberService(selectedBand)

    return <div className={"custom-menu"}>
        <Menu size={"large"} secondary>
            <Dropdown item
                      className={"selectBand"}
                      loading={bands ? bands.length === 0 : true}
                      disabled={bands ? bands.length === 0 : true}
                      placeholder={"Bands"}>
                <Dropdown.Menu>
                    {bands?.map(band => {
                        return <Dropdown.Item icon={"check"} key={band.dataBaseID} onClick={() => {
                            setSelectedBand(band)
                        }}>{band.name}</Dropdown.Item>
                    })}
                </Dropdown.Menu>
            </Dropdown>
            <Dropdown item placeholder={"Account"}>
                <Dropdown.Menu>
                    {selectedBand && <Dropdown.Header>{selectedBand.name}</Dropdown.Header>}
                    {selectedBand && <Dropdown.Item onClick={() => {memberOperation({type: "remove", payload: me!!}); setSelectedBand(undefined)}} >Leave Band</Dropdown.Item>}
                    {selectedBand && <Dropdown.Divider/>}
                    <Dropdown.Header>Account</Dropdown.Header>
                    <Dropdown.Item onClick={() => {signOut({type: "signOut"})}} >Log out</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            <Menu.Item>
                <Image size={"mini"} src={me?.photoUrl} avatar/>
            </Menu.Item>
        </Menu>
    </div>

}

