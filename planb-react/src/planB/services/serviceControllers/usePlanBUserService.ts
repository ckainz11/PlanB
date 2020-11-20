import {Band, Song, User} from "../../resources";
import {useDatabase, useDatabaseElements} from "../index";
import {useEffect, useState} from "react";

export function usePlanBUserService(): (User[] | undefined)[] {
    const [users] = useDatabaseElements<User>(`users`);

    return [
        users
    ];
}
