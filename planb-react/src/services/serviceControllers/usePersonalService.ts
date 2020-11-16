import firebase from "firebase";
import {useCallback, useEffect, useState} from "react";
import {User} from "../../resources";
import {useDatabase} from "..";
import {useDatabaseSingleElement} from "../dataBase/useDatabaseSingleElement";


export function usePersonalService () : [User | undefined, () => void]{
    const [uid, setUid] = useState<string>();
    const [currentUser] = useDatabaseSingleElement<User>(`users/${uid}`)
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
                // No user is signed in.
            }
        });
    }, [setUid]);

    const signInWithGoogle = useCallback(() => {
        firebase.auth().signInWithPopup(googleProvider).then(function(result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const token = result?.credential;
            console.log(token);
            // The signed-in user info.
            const user = result.user;
            console.log(user);
            // ...
        }).catch(function(error) {
            alert(error)
        });
    }, [googleProvider])

    return [currentUser, signInWithGoogle];
}
