import {useDatabase, useDatabaseElements} from "..";
import {Band, Song, User} from "../../resources";
import {useEffect, useState} from "react";

export function useSongService(band: Band | undefined): (Song[] | undefined)[] {
    const [songs] = useDatabaseElements<Song>(band && `bandSpace/${band.dataBaseID}/songs`);

    return [
        songs
    ];
}
