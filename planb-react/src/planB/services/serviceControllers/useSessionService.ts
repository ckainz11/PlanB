import {useDatabaseElements} from "..";
import {Band, Session, Song} from "../../resources";
import {useCallback} from "react";
import firebase from "firebase";

export function useSessionService(band: Band | undefined): [Session[] | undefined, (session: Session, songs: Song[]) => void] {
    const [sessions] = useDatabaseElements<Session>(band && `bandSpace/${band.dataBaseID}/sessions`);

    const createSession = useCallback(
        (session: Session, songs: Song[]) => {
            if (band) {


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
        [band]
    )

    return [
        sessions,
        createSession
    ];
}
