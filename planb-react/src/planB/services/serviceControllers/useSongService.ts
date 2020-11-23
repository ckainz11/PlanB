import {Band, Song, User} from "../../resources";
import {useCallback, useEffect, useState} from "react";
import firebase from "firebase";
import {useDatabaseElements} from "..";

type OperationType =
    { type: "add", payload: Band } |
    { type: "remove", payload: Band }
    ;

export function useSongService(band: Band | undefined): (Song[] | undefined)[] {
    const [songs] = useDatabaseElements<Song>(band && `bandSpace/${band.dataBaseID}/songs`);

    const songOperation = useCallback((operation: OperationType) => {
        if (band) {
            switch (operation.type) {
                case "add":
                    const songRef = firebase.database().ref("bandSpace/songs/").push();
                    const songID = songRef.key;

                    if (!songID) {
                        return;
                    }

                    songRef.set({
                        ...operation.payload, dataBaseID: undefined
                    }).catch(error => console.log(error));
                    break;
                case "remove":
                    firebase.database().ref("bandSpace/songs/").remove().catch(error => console.log(error));
                    break;
            }
        }
    }, [band]);
    return [
        songs
    ];
}
