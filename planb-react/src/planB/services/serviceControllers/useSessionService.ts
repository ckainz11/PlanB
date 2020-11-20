import {useDatabaseElements} from "..";
import {Band, Session, Song} from "../../resources";
import {useCallback} from "react";
import firebase from "firebase";

type OperationType =
    { type: "add", payload: Band } |
    { type: "remove", payload: Band }
    ;

export function useSessionService(band: Band | undefined): [Session[] | undefined, (operation: OperationType) => void] {
    const [sessions] = useDatabaseElements<Session>(band && `bandSpace/${band.dataBaseID}/sessions`);

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
                        ...operation.payload, dataBaseID: undefined
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
