import firebase from "firebase";
import {useCallback, useContext} from "react";
import {useDatabase, useDatabaseSpaceElements} from "../index";
import {Band, User} from "../../resources";

export function useBandService(user: User | undefined): (Band[] | undefined)[] {
    const [bands] = useDatabaseSpaceElements<Band>(user && `userSpace/${user.dataBaseID}/bands`, 'bands');

    const createBand = useCallback(
        (user: User, band: Band) => {
            if(firebase.database().ref("bands/" + band.dataBaseID).equalTo(null)) {

                firebase.database().ref("bands/" + band.dataBaseID).set({
                    description: band.description
                }).catch(error => console.log(error));

                firebase.database().ref("bandSpace/" + band.dataBaseID).set({
                    members: [user],
                    leader: [user]
                }).catch(error => console.log(error));

                firebase.database().ref("userSpace/" + user + "/bands").set({
                    [band.dataBaseID]: true
                }).catch(error => console.log(error));
            }
        },
        [],
        );

    return [
        bands
    ];
}
