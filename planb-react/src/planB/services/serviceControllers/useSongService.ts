import {Band, Song} from "../../resources";
import {useCallback} from "react";
import firebase from "firebase";
import {useDatabaseElements} from "..";

type OperationType =
    { type: "add", payload: Song } |
    { type: "remove", payload: Song }
    ;

export function useSongService(band: Band | undefined): [Song[] | undefined ,((operation: OperationType) => Promise<void>)] {
    const [songs] = useDatabaseElements<Song>(band && `bandSpace/${band.dataBaseID}/songs`);

    const songOperation = useCallback(async (operation: OperationType) => {
        if (band) {
            switch (operation.type) {
                case "add":
                    const songID = firebase.database().ref(`bandSpace/${band.dataBaseID}/songs`).push({...operation.payload, dataBaseID: null}, (err) => {if (err) {console.log(err)}}).key;
                    if (songID)
                        operation.payload.dataBaseID = songID
                    break;
                case "remove":
                    await firebase.database().ref(`bandSpace/${band.dataBaseID}/songs/${operation.payload.dataBaseID}`).remove();
                    break;
            }
        }
    }, [band]);

    return [
        songs,
        songOperation
    ];
}
