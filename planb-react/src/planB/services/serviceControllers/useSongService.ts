import {Band, Song} from "../../resources";
import {useCallback} from "react";
import firebase from "firebase/app";
import {useDatabaseElements} from "..";

type OperationType =
    { type: "add", payload: Song } |
    { type: "remove", payload: Song }
    ;

export function useSongService(band: Band | undefined): [Song[] | undefined ,((operation: OperationType) => Promise<void>),((song: Song) => number)] {
    const [songs] = useDatabaseElements<Song>(band && `bandSpace/${band.dataBaseID}/songs`);

    const songOperation = useCallback(async (operation: OperationType) => {
        if (band) {

            switch (operation.type) {
                case "add":
                    if(songValidation(operation.payload) < 0) {return;}
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

    const songValidation = useCallback((song: Song) => {
        if(song.name.split(" ")[0] === " ") { return -1}
        if(song.name.length > 50) {return -2}
        if(song.rating <= 0 ) { return -3}
        if(song.rating >= 10) { return -4}

        return 1;
    }, []);

    return [
        songs,
        songOperation,
        songValidation
    ];
}
