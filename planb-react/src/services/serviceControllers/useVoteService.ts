import {useDatabase, useDatabaseElements} from "..";
import {Band, Meeting, Song, Vote} from "../../resources";
import {useEffect, useState} from "react";

export function useVoteService(band:Band | undefined, meeting:Meeting | undefined): {votes: Vote[] | undefined} {
    const [votes] = useDatabaseElements<Vote>(band && meeting && `bandSpace/${band.dataBaseID}/meetingSpace/${meeting.dataBaseID}/votes`);

    return {
        votes
    };
}
