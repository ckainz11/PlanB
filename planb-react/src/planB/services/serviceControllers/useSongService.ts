import {Band, Song} from "../../resources";
import {useCallback} from "react";
import firebase from "firebase";
import {useDatabaseElements} from "..";

type OperationType =
    { type: "add", payload: Song } |
    { type: "remove", payload: Song }
    ;

export function useSongService(band: Band | undefined): [Song[] | undefined ,((operation: OperationType) => void)] {
    const [songs] = useDatabaseElements<Song>(band && `bandSpace/${band.dataBaseID}/songs`);

    const songOperation = useCallback((operation: OperationType) => {
        if (band) {
            switch (operation.type) {
                case "add":
                    firebase.database().ref(`bandSpace/${band.dataBaseID}/songs`).push({...operation.payload, dataBaseID: null}, (err) => {if (err) {console.log(err)}});
                    break;
                case "remove":
                    firebase.database().ref(`bandSpace/${band.dataBaseID}/songs/${operation.payload.dataBaseID}`).remove().catch(error => console.log(error));
                    break;
            }
        }
    }, [band]);

    return [
        songs,
        songOperation
    ];
}
