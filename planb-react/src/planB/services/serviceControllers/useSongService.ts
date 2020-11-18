import {useDatabase, useDatabaseElements} from "../index";
import {Band, Song, User} from "../../resources";
import {useCallback, useEffect, useState} from "react";
import firebase from "firebase";

export function useSongService(band: Band | undefined): (Song[] | undefined)[] {
    const [songs] = useDatabaseElements<Song>(band && `bandSpace/${band.dataBaseID}/songs`);

    const createSongs = useCallback(
        (band: Band, song: Song) => {
            if(firebase.database().ref("bandSpace/" + band.dataBaseID + "/songs/" + song.dataBaseID).equalTo(null)) {

                firebase.database().ref("bandSpace/" + band.dataBaseID + "/songs/" + song.dataBaseID).set({
                    content: song.content,
                    rating: song.rating
                })
            }
        },
        []
    );

    return [
        songs
    ];
}
