import {Band, DataBaseElement, Session, Song, User, Vote} from "../../resources";
import {type} from "os";
import {useCallback, useEffect, useState} from "react";
import firebase from "firebase";
import {useDatabaseSingleElement} from "../dataBase/useDatabaseSingleElement";

type OperationType =
    { type: "add", payload: Vote }
    ;

export function useVoteService(user:User | undefined, band:Band | undefined, session:Session | undefined): [Vote | undefined, (operation: OperationType) => void] {
    const [vote] = useDatabaseSingleElement<Vote>(band && session && user && `bandSpace/${band.dataBaseID}/sessionSpace/${session.dataBaseID}/votes/${user.dataBaseID}`);

    const voteOperation = useCallback((operation: OperationType) => {
        if (band && session && user) {
            switch (operation.type) {
                case "add":
                    firebase.database().ref(`bandSpace/${band.dataBaseID}/sessionSpace/${session.dataBaseID}/votes/${user.dataBaseID}`).set({...operation.payload, dataBaseID: null}).catch(error => console.log(error));
                    break;
            }
        }
    }, [band, session, user]);

    return [
        vote, voteOperation
    ];
}
