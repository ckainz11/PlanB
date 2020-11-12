import {useDatabase, useDatabaseElements} from "..";
import {Band, Song} from "../../resources";
import {useEffect, useState} from "react";

export function useSongService(band:Band | undefined): {songs: Song[] | undefined} {
    const [songs] = useDatabaseElements<Song>(band && `bandSpace/${band.dataBaseID}/songs`);

    return {
        songs
    };
}
