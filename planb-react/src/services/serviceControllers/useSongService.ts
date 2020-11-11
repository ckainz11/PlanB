import {useDatabaseValue} from "../index";
import {Band, Song} from "../../resources";
import {useEffect, useState} from "react";

export function useSongService(band:Band | undefined): {songs: Song[] | undefined} {
    const databaseValue = useDatabaseValue(band ? `bandSpace/${band.name}/songs` : undefined);
    const [songs, setSongs] = useState<Song[]>();

    useEffect(() => {
        if (databaseValue) {
            setSongs(Object.keys(databaseValue.val()).map(key => {return {name: key, ...databaseValue.val()[key]}}));
        }else {
            setSongs(undefined);
        }
    }, [databaseValue]);

    return {
        songs
    };
}
