import {useDatabaseElements} from "..";
import {Band, Session, Song} from "../../resources";
import {useCallback, useEffect, useState} from "react";
import firebase from "firebase/app";

type OperationType =
    { type: "add", payload: Session } |
    { type: "remove", payload: Session } |
    { type: "addWithSongs", payload: { session: Session, songs: Song[] } }
    ;

export function useSessionService(band: Band | undefined): [Session[], ((operation: OperationType) => Promise<void>), ((session: Session) => number)] {
    const [rawSessions] = useDatabaseElements<Session>(band && `bandSpace/${band.dataBaseID}/sessions`);
    const [compiledSessions, setCompiledSessions] = useState<Session[]>(rawSessions || []);

    useEffect(() => {
        if (rawSessions) {
            setCompiledSessions(rawSessions.map((session) => ({
                ...session,
                start: new Date(session.start),
                end: new Date(session.end),
            })));
        }
    }, [rawSessions]);

    const createSession = useCallback(async (session: Session, songs: Song[]) => {
        if (!band) {
            return;
        }
        const uid = firebase.auth().currentUser?.uid;
        if (!uid) {
            return;
        }
        const sessionID = firebase.database().ref(`bandSpace/${band.dataBaseID}/sessions`).push({
            ...session,
            start: session.start.toString(),
            end: session.end.toString(),
            proposer: uid,
            dataBaseID: null
        }, (err) => {
            if (err) {
                console.log(err)
            }
        }).key;
        if (!sessionID) {
            return
        }
        const songData = songs.reduce((acc, curr) => {
            acc[curr.dataBaseID] = true;
            return acc
        }, {} as any)

        await firebase.database().ref(`bandSpace/${band.dataBaseID}/sessionSpace/${sessionID}`).set({
            assignedSongs: songData
        });

        session.dataBaseID = sessionID
    }, [band]);

    const sessionValidation = useCallback((session: Session) => {
        if (session.start > session.end) {
            return -1
        }
        if (session.name.length < 3) {
            return -2
        }
        //if(session.name.split("")[0] === " ") {return -3}
        if (session.name.length > 50) {
            return -4
        }
        if (!isNaN(session.start.getTime())) {
            return -5
        }
        if (!isNaN(session.end.getTime())) {
            return -6
        }
        if (session.start < new Date()) {
            return -7
        }
        if (session.location.length > 100) {
            return -8
        }
        if (session.description.length > 2000) {
            return -9
        }

        return 1;
    }, []);

    const sessionOperation = useCallback(async (operation: OperationType) => {
            if (band) {
                switch (operation.type) {
                    case "add":
                        if (await sessionValidation(operation.payload) < 0) {
                            return;
                        }
                        operation.payload.name = operation.payload.name.replace(/^\s*\w+,\s\w+!\s*/, "")
                        try {
                            await createSession(operation.payload, [])
                        } catch (e) {
                            console.log(e)
                        }
                        break;
                    case "remove":
                        try {
                            await firebase.database().ref(`bandSpace/${band.dataBaseID}/sessionSpace/${operation.payload.dataBaseID}`).remove();
                            await firebase.database().ref(`bandSpace/${band.dataBaseID}/sessions/${operation.payload.dataBaseID}`).remove();
                        } catch (e) {
                            console.log(e)
                        }

                        break;
                    case "addWithSongs":
                        try {
                            if (await sessionValidation(operation.payload.session) < 0) {
                                return;
                            }
                            await createSession(operation.payload.session, operation.payload.songs)
                        } catch (e) {
                            console.log(e)
                        }
                }
            }
        }

        ,
        [band, createSession, sessionValidation]
        )
    ;



    return [compiledSessions, sessionOperation, sessionValidation];
}
