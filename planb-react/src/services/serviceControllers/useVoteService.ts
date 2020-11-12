import {useDatabaseValue} from "..";
import {Band, Meeting, Vote} from "../../resources";
import {useEffect, useState} from "react";

export function useSongService(band:Band | undefined, meeting:Meeting | undefined): {votes: Vote[] | undefined} {
    const databaseValue = useDatabaseValue(band ? `bandSpace/${band.dataBaseID}/meetingSpace/${meeting?.dataBaseID}/votes` : undefined);
    const [votes, setVotes] = useState<Vote[]>();

    useEffect(() => {
        if (databaseValue) {
            setVotes(Object.keys(databaseValue.val()).map(key => {return {dataBaseID: key, ...databaseValue.val()[key]}}));
        }else {
            setVotes(undefined);
        }
    }, [databaseValue]);

    return {
        votes
    };
}
