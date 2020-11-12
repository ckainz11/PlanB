import {useDatabaseValue} from "..";
import {Band, Song} from "../../resources";
import {useEffect, useState} from "react";

export function useSongService(band:Band | undefined): {songs: Song[] | undefined} {
    const databaseValue = useDatabaseValue(band ? `bandSpace/${band.dataBaseID}/songs` : undefined);
    const [songs, setSongs] = useState<Song[]>();

    useEffect(() => {
        if (databaseValue?.val()) {
            setSongs(Object.keys(databaseValue.val()).map(key => {return {dataBaseID: key, ...databaseValue.val()[key]}}));
        }else {
            setSongs(undefined);
        }
    }, [databaseValue]);

    return {
        songs
    };
}
