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

    const bandOperation = useCallback(async (operation: OperationType) => {
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

                    firebase.database().ref("bandSpace/" + bandID + "/members/" + user.dataBaseID).set(true)
                        .catch(error => {
                            error && console.log("2.1 " + error)
                        });

                    firebase.database().ref("userSpace/" + user.dataBaseID + "/bands/" + bandID).set(true)
                        .catch(error => {
                            error && console.log("3 " + error)
                        });

                    break;
                case "remove":
                    let members: string[] = [];
                    await firebase.database().ref("bandSpace/" + operation.payload.dataBaseID + "/members").once("value", (snapshot) => {
                        if (!snapshot.val()) {
                            return
                        }
                        members = (Object.keys(snapshot.val()).map((key) => {
                            return key
                        }))
                    })

                    if (members.length == 0) {
                        members.push(user.dataBaseID)
                    }

                    firebase.database().ref("bandSpace/" + operation.payload.dataBaseID).remove()
                        .then(() => {
                            firebase.database().ref("bands/" + operation.payload.dataBaseID).remove()
                                .catch(error => console.log(error));
                            members.forEach((member) => {
                                firebase.database().ref("userSpace/"+member+"/bands/" + operation.payload.dataBaseID).remove().catch(err => console.log(err))
                            })
                        }).catch(error => console.log(error));
                    break;
            }
        }
    }, [user]);


    return [bands, bandOperation];
}
