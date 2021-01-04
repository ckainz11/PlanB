import { useDatabaseElements } from "..";
import { Band, Session, Song } from "../../resources";
import { useCallback, useEffect, useState } from "react";
import firebase from "firebase/app";

type OperationType =
    { type: "add", payload: Session } |
    { type: "remove", payload: Session } |
    { type: "addWithSongs", payload: { session: Session, songs: Song[] } }
    ;

export function useSessionService(band: Band | undefined): [Session[] | undefined, (operation: OperationType) => Promise<void>] {
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
        console.log(songData);
        
        await firebase.database().ref(`bandSpace/${band.dataBaseID}/sessionSpace/${sessionID}`).set({
            assignedSongs: songData
        });

        session.dataBaseID = sessionID
    }, [band])

    const sessionOperation = useCallback(async (operation: OperationType) => {
        if (band) {
            switch (operation.type) {
                case "add":
                    await createSession(operation.payload, [])
                    break;
                case "remove":
                    await firebase.database().ref(`bandSpace/${band.dataBaseID}/sessionSpace/${operation.payload.dataBaseID}`);
                    await firebase.database().ref(`bandSpace/${band.dataBaseID}/sessions/${operation.payload.dataBaseID}`);
                    break;
                case "addWithSongs":
                    await createSession(operation.payload.session, operation.payload.songs)
            }
        }
    }, [band, createSession]);

    return [compiledSessions, sessionOperation];
}
