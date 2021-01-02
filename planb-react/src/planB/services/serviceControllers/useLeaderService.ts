import { useEffect, useState } from "react";
import { Band, User } from "../../resources";
import { useDatabaseSingleElement } from "../dataBase/useDatabaseSingleElement";

export default function useLeaderService (band: Band | undefined): [User | undefined]{
    const [leader, setLeader] = useState(band?.leader)
    const [leaderObj] = useDatabaseSingleElement<User>(leader && `users/${leader}`)

    useEffect(() => {
        setLeader(band?.leader)
    }, [band])
    
    return [
        leaderObj
    ];
}