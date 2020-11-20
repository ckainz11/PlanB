import {useDatabase, useDatabaseElements, useMemberService, useUserService} from "../index";
import {Band, DataBaseElement, Session, Song, User, Vote} from "../../resources";
import {type} from "os";
import {useEffect, useState} from "react";

interface databaseVote extends DataBaseElement {
    value: number
}

export function useVoteService(band:Band | undefined, session:Session | undefined): (Vote[] | undefined)[] {
    const [databaseVotes] = useDatabaseElements<databaseVote>(band && session && `bandSpace/${band.dataBaseID}/sessionSpace/${session.dataBaseID}/votes`);
    const [users] = useMemberService(band);
    const [votes, setVotes] = useState<Vote[]>();

    useEffect(() => {
        setVotes(databaseVotes && users && users?.map((user) => {
            return {dataBaseID: user.dataBaseID, value: databaseVotes.find((vote) => vote.dataBaseID === user.dataBaseID)?.value || 0} as Vote
        }));
    }, [databaseVotes, users])
    return [
        votes
    ];
}
