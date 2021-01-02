import React, {useContext, useState} from "react";
import {Button, Divider, Grid} from "semantic-ui-react";
import {SessionCreater} from "./SessionCreater";
import {SessionDisplay} from "./SessionDisplay";
import {usePersonalService, useSessionService} from "../services";
import {BandContext} from "../contexts";
import {SongPortfolio} from "./SongPortfolio";
import useLeaderService from "../services/serviceControllers/useLeaderService";

export const BandSpace = () => {

    const [me] = usePersonalService();
    const [currentBand, selectBand] = useContext(BandContext);
    const [leader] = useLeaderService(currentBand)
    const [sessions] = useSessionService(currentBand);

    if (me) {
        return <Grid stackable>
            <Grid.Column width={1}/>
            <Grid.Column width={10} >
                <h3><b>{currentBand?.name}</b> by {leader?.userName}</h3>
                <Divider/>
                <SessionCreater/>
                {sessions?.map(session => {
                    return <SessionDisplay session={session} key={session.dataBaseID}/>
                })}
            </Grid.Column>
            <Grid.Column width={4}>
                <SongPortfolio/>
            </Grid.Column>
            <Grid.Column width={1}/>
        </Grid>
    } else {
        return <p>loading...</p>
    }
}
