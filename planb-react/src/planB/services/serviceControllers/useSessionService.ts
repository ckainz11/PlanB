import {useDatabaseElements} from "..";
import {Band, Session, Song, CustomError} from "../../resources";
import {useCallback, useEffect, useState} from "react";
import firebase from "firebase/app";

type OperationType =
    { type: "add", payload: Session } |
    { type: "remove", payload: Session } |
    { type: "addWithSongs", payload: { session: Session, songs: Song[] } }
    ;

export function useSessionService(band: Band | undefined): [Session[], ((operation: OperationType) => Promise<void>), ((session: Session) => CustomError[])] {
    const [rawSessions] = useDatabaseElements<Session>(band?.dataBaseID && `bandSpace/${band.dataBaseID}/sessions`);
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
        if (!(band?.dataBaseID)) {
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
        let error = []

        if (!session.start || !session.end || session.start > session.end) {
            error.push({
                field: "start",
                message: "Start must not be after end."
                })
        }
        if (!session.name || session.name.length < 3) {
            error.push({
                field: "name",
                message: "Name is too short."
            })
        }
        if (!session.name || session.name.length > 50) {
            error.push({
                field: "name",
                message: "Name is too long."
            })
        }
        if (!session.start || isNaN(session.start.getTime())) {
            error.push({
                field: "start",
                message: "Start is not a valid date."
            })
        }
        if (!session.end || isNaN(session.end.getTime())) {
            error.push({
                field: "end",
                message: "End is not a valid date."
            })
        }
        if (!session.start || session.start < new Date()) {
            error.push({
                field: "start",
                message: "Start must not be in the past."
            })
        }
        if (!session.location || session.location.length > 100) {
            error.push({
                field: "location",
                message: "Location is too long."
            })
        }
        if (!session.description || session.description.length > 2000) {
            error.push({
                field: "description",
                message: "Description is too long."
            })
        }

        return error;
    }, []);

    const sessionOperation = useCallback(async (operation: OperationType) => {
            if (band) {
                switch (operation.type) {
                    case "add":
                        operation.payload.name = operation.payload.name.trim()
                        if (sessionValidation(operation.payload).length > 0) {
                            console.log("%c Validation failed. SessionService: 'add'", 'color: #D100D0')
                            return;
                        }
                        await createSession(operation.payload, [])
                        break;

                    case "remove":
                        await firebase.database().ref(`bandSpace/${band.dataBaseID}/sessionSpace/${operation.payload.dataBaseID}`).remove();
                        await firebase.database().ref(`bandSpace/${band.dataBaseID}/sessions/${operation.payload.dataBaseID}`).remove();
                        break;

                    case "addWithSongs":
                        operation.payload.session.name = operation.payload.session.name.trim()
                        if (sessionValidation(operation.payload.session).length > 0) {
                            console.log("%c Validation failed. SessionService: 'addWithSongs'", 'color: #D100D0')
                            return;
                        }
                        await createSession(operation.payload.session, operation.payload.songs)
                    }
                }
            }

        ,
            [band, createSession, sessionValidation]
        )
    ;


    return [compiledSessions, sessionOperation, sessionValidation];
}
