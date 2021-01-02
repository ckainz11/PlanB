import { Band, User } from "../../resources";
import { useDatabaseSpaceElements } from "../index";
import { useCallback } from "react";
import firebase from "firebase/app";

type OperationType =
    { type: "add", payload: User } |
    { type: "remove", payload: User }
    ;

export function useMemberService(band: Band | undefined): [User[] | undefined, (operation: OperationType) => Promise<void>] {
    const [members] = useDatabaseSpaceElements<User>(band && `bandSpace/${band.dataBaseID}/members`, 'users');

    const memberOperation = useCallback(async (operation: OperationType) => {
        if (band) {
            switch (operation.type) {
                case "add":
                    await firebase.database().ref(`bandSpace/${band.dataBaseID}/members/${operation.payload.dataBaseID}`).set(true);
                    await firebase.database().ref(`userSpace/${operation.payload.dataBaseID}/bands/${band.dataBaseID}`).set(true);
                    break;
                case "remove":
                    await firebase.database().ref(`bandSpace/${band.dataBaseID}/members/${operation.payload.dataBaseID}`).remove();
                    await firebase.database().ref(`userSpace/${operation.payload.dataBaseID}/bands/${band.dataBaseID}`).remove();
                    break;
            }
        }
    }, [band]);


    return [
        members, memberOperation
    ];
}
