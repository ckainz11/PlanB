import firebase from "firebase";
import { useCallback, useEffect } from "react";
import { useDatabaseSpaceElements } from "../index";
import { Band, User } from "../../resources";

type OperationType =
    { type: "add", payload: Band } |
    { type: "remove", payload: Band }
    ;

export function useBandService(user: User | undefined): [Band[] | undefined, (operation: OperationType) => Promise<void>] {
    let [bands] = useDatabaseSpaceElements<Band>(user && `userSpace/${user.dataBaseID}/bands`, 'bands');

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

                    try {
                        await firebase.database().ref("bandSpace/" + bandID + "/members/" + user.dataBaseID).set(true)
                        await firebase.database().ref("userSpace/" + user.dataBaseID + "/bands/" + bandID).set(true)
                    } catch (err) {
                        console.error(err)
                    }
                    break;

                case "remove":
                    try {

                        let members: string[] = [];
                        await firebase.database().ref("bandSpace/" + operation.payload.dataBaseID + "/members").once("value", (snapshot) => {
                            if (!snapshot.val()) {
                                return
                            }
                            members = (Object.keys(snapshot.val()).map((key) => {
                                return key
                            }))
                        })

                        if (members.length === 0) {
                            members.push(user.dataBaseID)
                        }

                        await firebase.database().ref("bandSpace/" + operation.payload.dataBaseID).remove()
                        await firebase.database().ref("bands/" + operation.payload.dataBaseID).remove()
                        members.forEach(async (member) => {
                            await firebase.database().ref("userSpace/" + member + "/bands/" + operation.payload.dataBaseID).remove();
                        })
                        break;
                    } catch (err) {
                        console.error(err)
                    }
                    break;
            }
        }
    }, [user]);


    return [bands, bandOperation];
}
