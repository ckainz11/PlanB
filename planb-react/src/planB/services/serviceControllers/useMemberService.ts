import {Band, User} from "../../resources";
import {useDatabaseSpaceElements} from "../index";
import {useCallback} from "react";
import firebase from "firebase";

type OperationType =
    {type: "add", payload: User} |
    {type: "remove", payload: User}
    ;

export function useMemberService(band: Band | undefined): (User[] | undefined)[] {
    const [members] = useDatabaseSpaceElements<User>(band && `bandSpace/${band.dataBaseID}/members`, 'users');

    const memberOperation = useCallback((operation: OperationType) => {
        if (band) {
            switch (operation.type) {
                case "add":
                    firebase.database().ref(`bandSpace/${band.dataBaseID}/members/${operation.payload.dataBaseID}`).set(true).catch(error => console.log(error));
                    firebase.database().ref(`userSpace/${operation.payload.dataBaseID}/bands/${band.dataBaseID}`).set(true).catch(error => console.log(error));
                    break;
                case "remove":
                    firebase.database().ref(`bandSpace/${band.dataBaseID}/members/${operation.payload.dataBaseID}`).remove().catch(error => console.log(error));
                    firebase.database().ref(`userSpace/${operation.payload.dataBaseID}/bands/${band.dataBaseID}`).remove().catch(error => console.log(error));
                    break;
            }
        }
    }, [band]);


    return [
        members
    ];
}
