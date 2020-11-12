import {Band, Song, User} from "../../resources";
import {useDatabase, useDatabaseElements} from "..";
import {useEffect, useState} from "react";

export function useUserService(): (User[] | undefined)[] {
    const [users] = useDatabaseElements<User>(`users`);

    return [
        users
    ];
}
