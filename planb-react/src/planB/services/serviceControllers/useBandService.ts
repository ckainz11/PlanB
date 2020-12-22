import firebase from "firebase";
import {useCallback, useEffect} from "react";
import {useDatabaseSpaceElements} from "../index";
import {Band, User} from "../../resources";

type OperationType =
    { type: "add", payload: Band } |
    { type: "remove", payload: Band }
    ;

export function useBandService(user: User | undefined): [Band[] | undefined, (operation: OperationType) => void] {
    let [bands] = useDatabaseSpaceElements<Band>(user && `userSpace/${user.dataBaseID}/bands`, 'bands');

    // useEffect(() => {
    //     if (bands && user) {
    //         bands = bands.filter((band) => {
    //             if (!band.dataBaseID) {
    //                 return false
    //             }
    //             return true
    //         })
    //     }
    // }, [bands])

    const bandOperation = useCallback((operation: OperationType) => {
        if (user) {
            switch (operation.type) {
                case "add":
                    const bandID = firebase.database().ref("bands/").push({
                        ...operation.payload, dataBaseID: null, leader: user.dataBaseID
                    }, (error) => {
                        error && console.log("1 " + error)
                    }).key;

                    if (!bandID) {
                        return;
                    }

                    firebase.database().ref("bandSpace/" + bandID + "/members/"+user.dataBaseID).set(true)
                        .catch(error => {
                            error && console.log("2.1 " + error)
                        });

                    firebase.database().ref("userSpace/" + user.dataBaseID + "/bands/" + bandID).set(true)
                        .catch(error => {
                            error && console.log("3 " + error)
                        });

                    break;
                case "remove":
                    firebase.database().ref("bandSpace/" + operation.payload.dataBaseID).remove()
                        .then(() => {
                        firebase.database().ref("userSpace/" + user.dataBaseID + "/bands/" + operation.payload.dataBaseID).remove()
                            .then(() => {
                            firebase.database().ref("bands/" + operation.payload.dataBaseID).remove()
                                .catch(error => console.log(error));
                        }).catch(error => console.log(error));
                    }).catch(error => console.log(error));
                    break;
            }
        }
    }, [user]);


    return [bands, bandOperation];
}
