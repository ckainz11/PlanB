import React from "react";
import {Header} from "../components";
import {Dropdown} from "semantic-ui-react";
import {Link} from "react-router-dom";

export const Planner = () => {
    return <div className={"Planner"}>
        <Header/>
        <Link to="/console">Go to Developer Console</Link>
    </div>
}
