import {Band, User} from "../../resources";
import {useDatabaseSpaceElements} from "../index";
import {useCallback} from "react";
import firebase from "firebase";

type OperationType = undefined;

export function useLeaderService(band: Band | undefined): [User[] | undefined, (operation: OperationType) => void] {
    const [leaders] = useDatabaseSpaceElements<User>(band && `bandSpace/${band.dataBaseID}/leaders`, 'users');

    //TODO: test
    const leaderOperation = useCallback((operation: OperationType) => {

    }, [band]);


    return [
        leaders, leaderOperation
    ];
}
