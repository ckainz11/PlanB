import firebase from "firebase";
import { useCallback, useEffect } from "react";
import { useDatabaseSpaceElements } from "../index";
import { Band, User } from "../../resources";

type OperationType =
    { type: "add", payload: Band } |
    { type: "remove", payload: Band } |
    { type: "addWithMembers", payload: { band: Band, members: User[] } }
    ;

export function useBandService(user: User | undefined): [Band[] | undefined, (operation: OperationType) => Promise<void>] {
    let [bands] = useDatabaseSpaceElements<Band>(user && `userSpace/${user.dataBaseID}/bands`, 'bands');

    const createBand = useCallback(async (band: Band, members: User[]) => {
        if (!user) {
            return;
        }

        let bandID = firebase.database().ref("bands/").push({
            ...band, dataBaseID: null, leader: user.dataBaseID
        }, (error) => {
            error && console.log(error)
        }).key;

        if (!bandID) {
            return;
        }

        band.dataBaseID = bandID;

        const dataMembers = members.reduce((acc, curr) => {
            acc[curr.dataBaseID] = true;
            return acc
        }, {} as any)

        dataMembers[user.dataBaseID] = true;

        await firebase.database().ref("bandSpace/" + bandID).set({
            members: dataMembers
        })

        await firebase.database().ref("userSpace/" + user.dataBaseID + "/bands/" + bandID).set(true)
        for (let m of members) {
            await firebase.database().ref("userSpace/" + m.dataBaseID + "/bands/" + bandID).set(true)
        }

    }, [user])

    const bandOperation = useCallback(async (operation: OperationType) => {
        if (user) {
            switch (operation.type) {
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
                        for (let member of members) {
                            await firebase.database().ref("userSpace/" + member + "/bands/" + operation.payload.dataBaseID).remove();
                        }
                        break;
                    } catch (err) {
                        console.error(err)
                    }
                    break;
                case "add":
                    createBand(operation.payload, [])
                    break;
                case "addWithMembers":
                    createBand(operation.payload.band, operation.payload.members)
                    break;
            }
        }
    }, [user, createBand]);


    return [bands, bandOperation];
}
