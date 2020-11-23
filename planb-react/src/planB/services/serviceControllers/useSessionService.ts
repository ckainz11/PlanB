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

    useEffect(() => {

    }, [sessions]);

    //TODO: Remove with sample data
    if (sessions) {
        for (let s of sessions) {
            if (!s.start)
                s.start = new Date(9999, 1, 1, 4, 20);
            if (!s.end)
                s.end = new Date(9999, 1, 1, 4, 21);
        }
    }

    const sessionOperation = useCallback((operation: OperationType) => {
        if (band) {
            switch (operation.type) {
                case "add":
                    const sessionRef = firebase.database().ref("bandSpace/sessions/").push();
                    const sessionID = sessionRef.key;

                    if (!sessionID) {
                        return;
                    }

                    sessionRef.set({
                        ...operation.payload,
                    }).catch(error => console.log(error));
                    break;
                case "remove":
                    firebase.database().ref("bandSpace/sessions/").remove().catch(error => console.log(error));
                    break;
            }
        }
    }, [band]);

    return [sessions, sessionOperation];
}
