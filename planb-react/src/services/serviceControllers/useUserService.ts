import {User} from "../../resources";
import {useDatabaseValue} from "..";
import {useEffect, useState} from "react";

export function useUserService(): { users: User[] | undefined } {
    const databaseValue = useDatabaseValue(`users`);
    const [users, setUsers] = useState<User[]>();

    useEffect(() => {
        if (databaseValue) {
            setUsers(Object.keys(databaseValue.val()).map(key => {return {dataBaseID: key, ...databaseValue.val()[key]} as User}));
        }else {
            setUsers(undefined);
        }
    }, [databaseValue]);

    return {
        users
    };
}
