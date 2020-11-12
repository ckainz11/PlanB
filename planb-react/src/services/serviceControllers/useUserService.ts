import {Song, User} from "../../resources";
import {useDatabase, useDatabaseElements} from "..";
import {useEffect, useState} from "react";

export function useUserService(): { users: User[] | undefined } {
    const [users] = useDatabaseElements<User>(`users`);

    return {
        users
    };
}
