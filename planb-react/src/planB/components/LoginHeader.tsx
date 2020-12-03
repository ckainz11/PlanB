import React from "react";
import logo from "../../images/LogoPlanB.png";
import {Dropdown} from "semantic-ui-react";

export const LoginHeader = () => {
    return <div className="header">
        <div className={"headerItem left"}>
            <img className={"logo"} src={logo} alt={"logo"}/>
        </div>
        </div>
}