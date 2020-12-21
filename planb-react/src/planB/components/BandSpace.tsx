import React, {useContext} from "react";
import {Divider} from "semantic-ui-react";
import {SessionCreater} from "./SessionCreater";
import {SessionDisplay} from "./SessionDisplay";
import {usePersonalService, useSessionService} from "../services";
import {BandContext} from "../contexts";

export const BandSpace = () => {

    const [user] = usePersonalService();
    const [currentBand] = useContext(BandContext);
    const [sessions] = useSessionService(currentBand);

    if (user?.userName) {
        return <div>
            <h3>Hey {user?.userName}, here are your next scheduled sessions</h3>
            <Divider/>
            <SessionCreater/>
            {sessions?.map(session => {
                return <SessionDisplay session={session} key={session.dataBaseID}/>
            })}
        </div>
    } else {
        return <p>loading...</p>
    }
}
