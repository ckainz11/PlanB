import {useDatabaseElements} from "..";
import {Band, Session, User} from "../../resources";
import {useCallback, useEffect, useState} from "react";
import firebase from "firebase";

export function useUserService(): [User[] | undefined] {
    const [users] = useDatabaseElements<User>(`users`);

    return [users];
}
