import React, {useContext, useState} from "react";
import {Header, MeetingDisplay} from "../components";
import {Link} from "react-router-dom";
import {BandContext} from "../contexts";
import {useSessionService} from "../../services";
import {Band} from "../../resources";


export const Planner = () => {
    const [selectedBand, setSelectedBand] = useState<Band>();

    const [meetings] = useSessionService(selectedBand);

    return <div className={"Planner"}>
        <BandContext.Provider value={[selectedBand, (band) => {setSelectedBand(band)}]}>
            <Header/>
            <Link to="/console">Link to Developer Console</Link>

            <div style={{color: "white"}}>
                <h2>Meetings: </h2>
                <h2>{selectedBand?.dataBaseID}</h2>
                {meetings?.map(meeting => {
                    return <MeetingDisplay meeting={meeting} key={meeting.dataBaseID}/>
                })}
            </div>
        </BandContext.Provider>
    </div>
}
