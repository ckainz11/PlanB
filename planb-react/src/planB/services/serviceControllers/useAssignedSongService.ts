import {useCallback, useContext} from "react";
import {useDatabaseSpaceElements} from "../index";
import {Band, Song, Session, User, DataBaseElement} from "../../resources";
import firebase from "firebase";

type OperationType =
    {type: "add", payload: Song} |
    {type: "remove", payload: DataBaseElement}
    ;

export function useAssignedSongService(band: (Band | undefined), session: (Session | undefined)): (Song[] | undefined)[] {
    const [assignedSongs] = useDatabaseSpaceElements<Song>(band && session && `bandSpace/${band.dataBaseID}/sessionSpace/${session.dataBaseID}/assignedSongs`, band && `bandSpace/${band.dataBaseID}/songs`);

    //Todo: Test!!!
    const memberOperation = useCallback((operation: OperationType) => {
        if (band && session) {
            switch (operation.type) {
                case "add":
                    firebase.database().ref(`bandSpace/${band.dataBaseID}/sessionSpace/${session.dataBaseID}/assignedSongs/${operation.payload.dataBaseID}`).set(true).catch(error => console.log(error));
                    break;
                case "remove":
                    firebase.database().ref(`bandSpace/${band.dataBaseID}/sessionSpace/${session.dataBaseID}/assignedSongs/${operation.payload.dataBaseID}`).remove().catch(error => console.log(error));
                    break;
            }
        }
    }, [band, session]);

    return [
        assignedSongs
    ];
}
