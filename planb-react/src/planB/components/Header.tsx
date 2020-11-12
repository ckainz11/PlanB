import React from "react";
import {useBandService} from "../../services";
import {Dropdown, Container, Menu, FormField, Image, Input} from "semantic-ui-react";

import logo from "../../images/LogoPlanB.png"

export const Header = () => {

    const [bands] = useBandService({dataBaseID: "ChristophID"});

    const sampleBands = [
        {key: 1, text: "Band1"},
        {key: 2, text: "Band2"}
    ];




    return (
        <Container className={"header"}>
            <div className={"logo-placeholder"}>
                <Image src={logo}/>
            </div>

            <div className={"header-band-user-controls"}>
                <Input input="Band" />
                <Image avatar></Image>
                <span>Username</span>
            </div>
        </Container>
    )
}
