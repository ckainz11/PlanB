import {useCallback, useContext} from "react";
import {useDatabaseSpaceElements} from "..";
import {Band, Song, Meeting} from "../../resources";

export function useAssignedSongService(band: (Band | undefined), meeting: (Meeting | undefined)): {assSongs: (Array<Song> | undefined)} {
    const assSongs = useDatabaseSpaceElements<Song>(band && meeting && `bandSpace/${band.dataBaseID}/meetingSpace/${meeting.dataBaseID}/assignedSongs`, band && `bandSpace/${band.dataBaseID}/songs`);

    return {
        assSongs
    };
}
