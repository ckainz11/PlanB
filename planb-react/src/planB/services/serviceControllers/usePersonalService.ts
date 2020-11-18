import firebase from "firebase";
import {useCallback, useEffect, useState} from "react";
import {User} from "../../resources";
import {useDatabase} from "../index";
import {useDatabaseSingleElement} from "../dataBase/useDatabaseSingleElement";


export function usePersonalService () : [User | undefined, () => void, () => void]{
    const [uid, setUid] = useState<string>();
    const [currentUser] = useDatabaseSingleElement<User>(uid && `users/${uid}`)
    const [googleProvider, setGoogleProvider] = useState(new firebase.auth.GoogleAuthProvider())

    useEffect(() => {
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                const newUser: User = {dataBaseID: user.uid, email: user.email, emailVerified: user.emailVerified, photoUrl: user.photoURL, userName: user.displayName};
                const {dataBaseID, ...userData} = newUser;
                firebase.database().ref(`users/${dataBaseID}`).update(userData).then(() => {
                    setUid(newUser.dataBaseID);
                });
            } else {
                setUid(undefined);
            }
        });
    }, [setUid]);

    const signInWithGoogle = useCallback(() => {
        firebase.auth().signInWithPopup(googleProvider).then(function(result) {
        }).catch(function(error) {
            alert(error)
        });
    }, [googleProvider]);

    const signOut = useCallback(() => {
        firebase.auth().signOut();
    }, [])

    return [currentUser, signInWithGoogle, signOut];
}
