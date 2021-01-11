import firebase from "firebase/app";
import {useCallback, useEffect, useState} from "react";
import {User} from "../../resources";
import {useDatabaseSingleElement} from "../dataBase/useDatabaseSingleElement";

type OperationType =
    { type: "signInWithGoogle" } |
    { type: "signInWithGithub" } |
    { type: "signOut" }
    ;

export function usePersonalService(): [User | undefined, (operation: OperationType) => Promise<void>] {
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
                firebase.database().ref(`users/${dataBaseID}`).update(userData, (err) => err && console.log(err));

                setUid(newUser.dataBaseID);
            } else {
                setUid(undefined);
            }
        });
    }, []);

    const personalOperation = useCallback(async (operation: OperationType) => {
        switch (operation.type) {
            case "signInWithGoogle":
                const googleProvider = new firebase.auth.GoogleAuthProvider();
                await firebase.auth().signInWithPopup(googleProvider);
                break;
            case "signInWithGithub":
                const githubProvider = new firebase.auth.GithubAuthProvider();
                await firebase.auth().signInWithPopup(githubProvider)
                break;
            case "signOut":
                await firebase.auth().signOut()
                break;
        }
    }, []);

    return [currentUser, personalOperation];
}
