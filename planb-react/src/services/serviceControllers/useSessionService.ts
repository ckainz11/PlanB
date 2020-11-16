import {useDatabase, useDatabaseElements} from "..";
import {Band, Session, Song, User} from "../../resources";
import {useCallback, useEffect, useState} from "react";
import firebase from "firebase";

export function useSessionService(band: Band | undefined): (Session[] | undefined)[] {
    const [sessions] = useDatabaseElements<Session>(band && `bandSpace/${band.dataBaseID}/sessions`);

    const createSession = useCallback(
        (band: Band, session: Session, songs: Song[]) => {
            if(firebase.database().ref("bandSpace/" + band.dataBaseID + "/sessions/" + session.dataBaseID).equalTo(null)) {

                firebase.database().ref("bandSpace/" + band.dataBaseID + "/sessions/" + session.dataBaseID).set({
                    date: session.date,
                    description: session.description,
                    endTime: session.end,
                    location: session.location,
                    proposer: session.proposer,
                    startTime: session.start
                });

                firebase.database().ref("bandSpace/" + band.dataBaseID + "/sessionSpace" + session.dataBaseID).set({
                    assignedSongs: songs
                })
            }
        },
        []
    )

    return [
        sessions
    ];
}
