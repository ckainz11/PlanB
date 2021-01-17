import firebase from "firebase/app";
import {useCallback} from "react";
import {useDatabaseSpaceElements} from "../index";
import {Band, CustomError, User} from "../../resources";

type OperationType =
    { type: "add", payload: Band } |
    { type: "remove", payload: Band } |
    { type: "addWithMembers", payload: { band: Band, members: User[] } }
    ;

export function useBandService(user: User | undefined): [(Band[] | undefined), ((operation: OperationType) => Promise<void>), ((band: Band) => CustomError[])] {
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

    const bandValidation = useCallback( (band: Band) => {
        let error : CustomError[] = []

        if (!band.name) {
            error.push({
                field: "name",
                message: "Name must be filled out."
            })
        }
        if (!band.description) {
            error.push({
                field: "description",
                message: "Description must be filled out."
            })
        }

        if(error.length > 0) return error

        if (band.name.length < 3) {
            error.push({
                field: "name",
                message: "Name is too short."
            })
        }
        if (band.name.length > 30) {
            error.push({
                field: "name",
                message: "Name is too long."
            })
        }
        if (band.description.length > 500) {
            error.push({
                field: "description",
                message: "Description is too long."
            })
        }

        return error
    }, [])


    const bandOperation = useCallback(async (operation: OperationType) => {
        if (user?.dataBaseID) {
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
                    operation.payload.name = operation.payload.name.trim()
                    if (bandValidation(operation.payload).length > 0) {
                        console.log("%c Validation failed. BandService: 'add'", 'color: #D100D0')
                        return
                    }
                    await createBand(operation.payload, [])
                    break;
                case "addWithMembers":
                    operation.payload.band.name = operation.payload.band.name.trim()
                    if (bandValidation(operation.payload.band).length > 0) {
                        console.log("%c Validation failed. BandService: 'addWithMembers'", 'color: #D100D0')
                        return
                    }
                    await createBand(operation.payload.band, operation.payload.members)
                    break;
            }
        }
    }, [user, createBand, bandValidation]);


    return [bands, bandOperation, bandValidation];
}
