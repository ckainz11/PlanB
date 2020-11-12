import {useCallback, useContext} from "react";
import {useDatabaseSpaceElements} from "..";
import {Band, Song, Meeting} from "../../resources";

export function useAssignedSongService(band: (Band | undefined), meeting: (Meeting | undefined)): {songs: (Array<Song> | undefined)} {
    const songs = useDatabaseSpaceElements<Song>(band && meeting && `bandSpace/${band.dataBaseID}/meetingSpace/${meeting.dataBaseID}/assignedSongs`, band && `bandSpace/${band.dataBaseID}/songs`);

    return {
        songs: songs
    };
}