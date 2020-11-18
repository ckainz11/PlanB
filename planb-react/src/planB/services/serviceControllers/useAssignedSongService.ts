import {useCallback, useContext} from "react";
import {useDatabaseSpaceElements} from "../index";
import {Band, Song, Session, User} from "../../resources";

export function useAssignedSongService(band: (Band | undefined), session: (Session | undefined)): (Song[] | undefined)[] {
    const [assSongs] = useDatabaseSpaceElements<Song>(band && session && `bandSpace/${band.dataBaseID}/sessionSpace/${session.dataBaseID}/assignedSongs`, band && `bandSpace/${band.dataBaseID}/songs`);

    return [
        assSongs
    ];
}
