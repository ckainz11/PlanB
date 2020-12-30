import {useCallback} from "react";
import {useDatabaseSpaceElements} from "../index";
import {Band, Song, Session} from "../../resources";
import firebase from "firebase";

type OperationType =
    {type: "add", payload: Song} |
    {type: "remove", payload: Song}
    ;

export function useAssignSongService(band: (Band | undefined), session: (Session | undefined)): [(Song[] | undefined), ((operation: OperationType) => Promise<void>)] {
    const [assignedSongs] = useDatabaseSpaceElements<Song>(band && session && `bandSpace/${band.dataBaseID}/sessionSpace/${session.dataBaseID}/assignedSongs`, band && `bandSpace/${band.dataBaseID}/songs`);

    const assignSongOperation = useCallback(async (operation: OperationType) => {
        if (band && session) {
            switch (operation.type) {
                case "add":
                    await firebase.database().ref(`bandSpace/${band.dataBaseID}/sessionSpace/${session.dataBaseID}/assignedSongs/${operation.payload.dataBaseID}`).set(true);
                    break;
                case "remove":
                    await firebase.database().ref(`bandSpace/${band.dataBaseID}/sessionSpace/${session.dataBaseID}/assignedSongs/${operation.payload.dataBaseID}`).remove();
                    break;
            }
        }
    }, [band, session]);

    return [
        assignedSongs,
        assignSongOperation
    ];
}
