import React, {useContext, useState} from "react";
import {Header, SessionDisplay} from "../components";
import {Link} from "react-router-dom";
import {BandContext} from "../contexts";
import {useSessionService, usePersonalService} from "../services";
import {Band} from "../resources";
import {Button, Divider, Input} from "semantic-ui-react";
import {SessionCreater} from "../components/SessionCreater";


export const Planner = () => {
    const [selectedBand, setSelectedBand] = useState<Band>();
    const [user, signIn] = usePersonalService();
    const [sessions, addSession] = useSessionService(selectedBand);

    return <div className={"Planner"}>
        <BandContext.Provider value={[selectedBand, (band) => {setSelectedBand(band)}]}>
            <Header/>
            <Link to="/console">Link to Developer Console</Link>
            <p/>
            <p/>
            <div style={{color: "#dddddd", textAlign: "center"}}>
                <h3>Hey {user?.userName}, here are your next scheduled sessions</h3>
                <Divider/>
                <SessionCreater/>
                {sessions?.map(session => {
                    return <SessionDisplay meeting={session} key={session.dataBaseID}/>
                })}
            </div>
        </BandContext.Provider>
    </div>
}
