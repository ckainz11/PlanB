import {useDatabaseElements} from "..";
import {Band, Session} from "../../resources";
import {useCallback, useEffect, useState} from "react";
import firebase from "firebase/app";

type OperationType =
    { type: "add", payload: Session } |
    { type: "remove", payload: Session }
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

    const sessionOperation = useCallback(async (operation: OperationType) => {
        if (band) {
            switch (operation.type) {
                case "add":
                    const uid = firebase.auth().currentUser?.uid;
                    if (!uid) {
                        return;
                    }
                    const sessionID = firebase.database().ref(`bandSpace/${band.dataBaseID}/sessions`).push({
                        ...operation.payload,
                        start: operation.payload.start.toString(),
                        end: operation.payload.end.toString(),
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
                    operation.payload.dataBaseID = sessionID
                    break;
                case "remove":
                    await firebase.database().ref(`bandSpace/${band.dataBaseID}/sessionSpace/${operation.payload.dataBaseID}`);
                    await firebase.database().ref(`bandSpace/${band.dataBaseID}/sessions/${operation.payload.dataBaseID}`);
                    break;
            }
        }
    }, [band]);

    return [compiledSessions, sessionOperation];
}
