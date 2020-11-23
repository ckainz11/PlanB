import {useDatabaseElements} from "..";
import {Band, Session, Song} from "../../resources";
import {useCallback, useEffect} from "react";
import firebase from "firebase";

type OperationType =
    { type: "add", payload: Session } |
    { type: "remove", payload: Session }
    ;

export function useSessionService(band: Band | undefined): [Session[] | undefined, (operation: OperationType) => void] {
    const [sessions] = useDatabaseElements<Session>(band && `bandSpace/${band.dataBaseID}/sessions`);

    //Todo: optimize
    if (sessions) {
        for (let session of sessions) {
            session.start = new Date(session.start);
            session.end = new Date(session.end);
        }
    }

    const sessionOperation = useCallback((operation: OperationType) => {
        if (band) {
            switch (operation.type) {
                case "add":
                    console.log(operation.payload);
                    firebase.database().ref(`bandSpace/${band.dataBaseID}/sessions`).push({
                        ...operation.payload, start: operation.payload.start.toString(), end: operation.payload.end.toString()
                    }, (err) => console.log(err));
                    break;
                case "remove":
                    firebase.database().ref("bandSpace/sessions/").remove().catch(error => console.log(error));
                    break;
            }
        }
    }, [band]);

    return [sessions, sessionOperation];
}
