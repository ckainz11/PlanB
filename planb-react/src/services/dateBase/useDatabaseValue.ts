import {useContext, useEffect, useState} from "react";
import {BServiceContext} from "..";
import firebase from "firebase";

export function useDatabaseValue(path: string | undefined) {
    const [value, setValue] = useState();

    useEffect(() => {
        if (path) {
            const ref = firebase.database().ref(path);
            const subscription = ref.on("value", snapshot => {
                setValue(() => snapshot.val());
            });
            return () => {
                ref.off("value", subscription)
            }
        }
    }, [path]);

    return value as object | undefined;
}
