import {useCallback, useContext} from "react";
import {useDatabaseSpaceElements} from "..";
import {Band, Song, Meeting, User} from "../../resources";

export function useAssignedSongService(band: (Band | undefined), meeting: (Meeting | undefined)): (Song[] | undefined)[] {
    const [assSongs] = useDatabaseSpaceElements<Song>(band && meeting && `bandSpace/${band.dataBaseID}/meetingSpace/${meeting.dataBaseID}/assignedSongs`, band && `bandSpace/${band.dataBaseID}/songs`);

    return [
        assSongs
    ];
}
