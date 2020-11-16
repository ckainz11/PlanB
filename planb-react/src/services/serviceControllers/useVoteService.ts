import {useDatabase, useDatabaseElements} from "..";
import {Band, Session, Song, User, Vote} from "../../resources";
import {useEffect, useState} from "react";

export function useVoteService(band:Band | undefined, meeting:Session | undefined): (Vote[] | undefined)[] {
    const [votes] = useDatabaseElements<Vote>(band && meeting && `bandSpace/${band.dataBaseID}/meetingSpace/${meeting.dataBaseID}/votes`);

    return [
        votes
    ];
}
