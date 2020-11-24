import {useDatabaseElements} from "..";
import {Band, Session, Song, User} from "../../resources";
import {useCallback, useEffect, useLayoutEffect, useState} from "react";
import firebase from "firebase";

type OperationType =
    { type: "add", payload: Session } |
    { type: "remove", payload: Session }
    ;

export function useSessionService(band: Band | undefined): [Session[] | undefined, (operation: OperationType) => void] {
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

    const sessionOperation = useCallback((operation: OperationType) => {
        if (band) {
            switch (operation.type) {
                case "add":
                    const uid = firebase.auth().currentUser?.uid;
                    if (!uid) {
                        return;
                    }
                    firebase.database().ref(`bandSpace/${band.dataBaseID}/sessions`).push({
                        ...operation.payload,
                        start: operation.payload.start.toString(),
                        end: operation.payload.end.toString(),
                        proposer: uid
                    }, (err) => {
                        if (err) {
                            console.log(err)
                        }
                    });
                    break;
                case "remove":
                    firebase.database().ref(`bandSpace/${band.dataBaseID}/sessionSpace/${operation.payload.dataBaseID}`).remove().catch(error => console.log(error));
                    firebase.database().ref(`bandSpace/${band.dataBaseID}/sessions/${operation.payload.dataBaseID}`).remove().catch(error => console.log(error));
                    break;
            }
        }
    }, [band]);

    return [compiledSessions, sessionOperation];
}
