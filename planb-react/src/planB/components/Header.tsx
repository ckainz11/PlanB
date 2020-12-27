import React, {useCallback, useContext} from "react";
import {useBandService, usePersonalService} from "../services";
import {Dropdown, Menu, Image} from "semantic-ui-react";
import {BandContext} from "../contexts";


import logo from "../../images/LogoPlanB.png"


export const Header = () => {

    const [me, signOut] = usePersonalService();

    const [bands, bandOperation] = useBandService(me);

    const [selectedBand, setSelectedBand] = useContext(BandContext);

    return (
        <Menu className={"nav"} secondary>
            <Menu.Item position={"left"}>
                <img className={"logo"} src={logo} alt={"logo"}/>
            </Menu.Item>
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
                    <Dropdown.Header>{selectedBand?.name}</Dropdown.Header>
                    { <Dropdown.Item>Add Member</Dropdown.Item>}
                    <Dropdown.Item>Leave Band</Dropdown.Item>
                    <Dropdown.Divider/>
                    <Dropdown.Header>Account</Dropdown.Header>
                    <Dropdown.Item onClick={() => {signOut({type: "signOut"}); console.log(me)}} >Log out</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            <Menu.Item>
                <Image src={me?.photoUrl} avatar/>
            </Menu.Item>
        </Menu>
    )
}
