import React, {useContext} from "react";
import {Header, MeetingDisplay} from "../components";
import {Link} from "react-router-dom";
import {BandContext} from "../contexts";
import {useMeetingService} from "../../services";
import {Band} from "../../resources";


export const Planner = () => {

    const [selectedBand, setSelectedBand] = useContext(BandContext);

    const [meetings] = useMeetingService(selectedBand);

    return <div className={"Planner"}>
        <Header/>

        <Link to="/console">Go to Developer Console</Link>
    </div>
}
