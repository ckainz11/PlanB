import React, {useCallback, useContext} from "react";
import {useBandService, useMemberService, usePersonalService} from "../services";
import {Dropdown, Menu, Image, Input} from "semantic-ui-react";
import {BandContext} from "../contexts";


import logo from "../../images/LogoPlanB.png"
import {HeaderMenu} from "./HeaderMenu";


export const Header = () => {



    return (
        <div className={"nav"} >
            <img className={"logo"} src={logo} alt={"logo"}/>
            <HeaderMenu/>
        </div>
    )
}
