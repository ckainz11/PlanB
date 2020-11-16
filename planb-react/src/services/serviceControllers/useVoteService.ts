import {useDatabase, useDatabaseElements, useMemberService, useUserService} from "..";
import {Band, DataBaseElement, Meeting, Song, User, Vote} from "../../resources";
import {type} from "os";
import {useEffect, useState} from "react";

interface databaseVote extends DataBaseElement {
    value: number
}

export function useVoteService(band:Band | undefined, meeting:Meeting | undefined): (Vote[] | undefined)[] {
    const [databaseVotes] = useDatabaseElements<databaseVote>(band && meeting && `bandSpace/${band.dataBaseID}/meetingSpace/${meeting.dataBaseID}/votes`);
    const [users] = useMemberService(band);
    const [votes, setVotes] = useState<Vote[]>();

    useEffect(() => {
        databaseVotes && users && users?.map((user) => {
            return {dataBaseID: user.dataBaseID, value: databaseVotes.find((vote) => vote.dataBaseID === user.dataBaseID) || 0} as Vote
        });
    }, [databaseVotes, users])
    return [

    ];
}
