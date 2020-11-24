import firebase from "firebase";
import {useCallback, useContext} from "react";
import {useDatabase, useDatabaseSpaceElements} from "../index";
import {Band, Song, User} from "../../resources";

type OperationType =
    { type: "add", payload: Band } |
    { type: "remove", payload: Band }
    ;

export function useBandService(user: User | undefined): [Band[] | undefined, (operation: OperationType) => void] {
    const [bands] = useDatabaseSpaceElements<Band>(user && `userSpace/${user.dataBaseID}/bands`, 'bands');

    const bandOperation = useCallback((operation: OperationType) => {
        if (user) {
            switch (operation.type) {
                //TODO: fix
                case "add":
                    const bandRef = firebase.database().ref("bands/").push();
                    const bandID = bandRef.key;

                    if (!bandID) {
                        return;
                    }

                    bandRef.set({
                        ...operation.payload, dataBaseID: undefined
                    }).catch(error => console.log(error));


                    firebase.database().ref("bandSpace/" + bandID).set({
                        members: {[user.dataBaseID]: true},
                        leader: {[user.dataBaseID]: true},
                    }).catch(error => console.log(error));

                    firebase.database().ref("userSpace/" + user + "/bands").set({
                        [bandID]: true
                    }).catch(error => console.log(error));
                    break;
                case "remove":
                    firebase.database().ref("bands/" + operation.payload.dataBaseID).remove().catch(error => console.log(error));
                    firebase.database().ref("bandSpace/" + operation.payload.dataBaseID).remove().catch(error => console.log(error));
                    firebase.database().ref("userSpace/" + user + "/bands").remove().catch(error => console.log(error));
                    break;
            }
        }
    }, [user]);



    return [bands, bandOperation];
}
