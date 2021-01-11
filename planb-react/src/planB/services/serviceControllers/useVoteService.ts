import {Band, Session, User, Vote} from "../../resources";
import {useCallback} from "react";
import firebase from "firebase/app";
import {useDatabaseSingleElement} from "../dataBase/useDatabaseSingleElement";

type OperationType =
    { type: "add", payload: Vote }
    ;

export function useVoteService(user:User | undefined, band:Band | undefined, session:Session | undefined): [Vote | undefined, (operation: OperationType) => Promise<void>] {
    const [vote] = useDatabaseSingleElement<Vote>(band?.dataBaseID && session?.dataBaseID && user?.dataBaseID && `bandSpace/${band.dataBaseID}/sessionSpace/${session.dataBaseID}/votes/${user.dataBaseID}`);

    const voteOperation = useCallback(async (operation: OperationType) => {
        if (band?.dataBaseID && session?.dataBaseID && user?.dataBaseID) {
            switch (operation.type) {
                case "add":
                    await firebase.database().ref(`bandSpace/${band.dataBaseID}/sessionSpace/${session.dataBaseID}/votes/${user.dataBaseID}`).set({...operation.payload, dataBaseID: null});
                    break;
            }
        }
    }, [band, session, user]);

    return [
        vote, voteOperation
    ];
}
