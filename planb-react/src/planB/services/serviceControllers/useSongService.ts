import {Band, CustomError, Song} from "../../resources";
import {useCallback} from "react";
import firebase from "firebase/app";
import {useDatabaseElements} from "..";

type OperationType =
    { type: "add", payload: Song } |
    { type: "remove", payload: Song } |
    { type: "update", payload: Song }
    ;

export function useSongService(band: Band | undefined): [Song[] | undefined ,((operation: OperationType) => Promise<void>),((song: Song) => CustomError[])] {
    const [songs] = useDatabaseElements<Song>(band?.dataBaseID && `bandSpace/${band.dataBaseID}/songs`);

    const songValidation = useCallback((song: Song) => {
        let error = []

        if(!song.name || song.name.length < 1) {
            error.push({
                field: "name",
                message: "Name is too short."
            })
        }
        if(!song.name || song.name.length > 50) {
            error.push({
                field: "name",
                message: "Name is too long."
            })
        }
        if(!song.rating || song.rating < 0 ) {
            error.push({
                field: "rating",
                message: "Rating must be above 0."
            })
        }
        if(!song.rating || song.rating > 10) {
            error.push({
                field: "rating",
                message: "Rating must be under 10."
            })
        }
        if(!song.content || song.content.length > 200) {
            error.push({
                field: "content",
                message: "Content is too long."
            })
        }

        return error;
    }, []);

    const songOperation = useCallback(async (operation: OperationType) => {
        if (band?.dataBaseID) {
            switch (operation.type) {
                case "add":
                    operation.payload.name = operation.payload.name.trim()
                    if(songValidation(operation.payload).length > 0) {
                        console.log("%c Validation failed. SongService: 'add'", 'color: #D100D0')
                        return;
                    }
                    const songID = firebase.database().ref(`bandSpace/${band.dataBaseID}/songs`).push({...operation.payload, dataBaseID: null}, (err) => {if (err) {console.log(err)}}).key;
                    if (songID)
                        operation.payload.dataBaseID = songID
                    break;
                case "remove":
                    await firebase.database().ref(`bandSpace/${band.dataBaseID}/songs/${operation.payload.dataBaseID}`).remove();
                    break;
                case "update":
                    await firebase.database().ref(`bandSpace/${band.dataBaseID}/songs/${operation.payload.dataBaseID}`).update({...operation.payload, dataBaseID: null})
            }
        }
    }, [band, songValidation]);

    return [
        songs,
        songOperation,
        songValidation
    ];
}
