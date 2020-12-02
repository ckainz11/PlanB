import firebase from "firebase";
import {useCallback, useEffect, useState} from "react";
import {User} from "../../resources";
import {useDatabase} from "../index";
import {useDatabaseSingleElement} from "../dataBase/useDatabaseSingleElement";

type OperationType =
    { type: "signInWithGoogle" } |
    { type: "signOut" }
    ;

export function usePersonalService(): [User | undefined, (operation: OperationType) => void] {
    const [uid, setUid] = useState<string>();
    const [currentUser] = useDatabaseSingleElement<User>(uid && `users/${uid}`)

    useEffect(() => {
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                const newUser: User = {
                    dataBaseID: user.uid,
                    email: user.email || undefined,
                    emailVerified: user.emailVerified,
                    photoUrl: user.photoURL || undefined,
                    userName: user.displayName || undefined
                };
                const {dataBaseID, ...userData} = newUser;
                firebase.database().ref(`users/${dataBaseID}`).update(userData, err => err && console.error(err));

                setUid(newUser.dataBaseID);

            } else {
                setUid(undefined);
            }
        });
    }, [setUid]);

    const personalOperation = useCallback((operation: OperationType) => {
        switch (operation.type) {
            case "signInWithGoogle":
                const googleProvider = new firebase.auth.GoogleAuthProvider();
                firebase.auth().signInWithPopup(googleProvider).catch(error => {alert(error)});
                break;
            case "signOut":
                firebase.auth().signOut().catch(error => console.log(error));
                break;
        }
    }, []);

    return [currentUser, personalOperation];
}
