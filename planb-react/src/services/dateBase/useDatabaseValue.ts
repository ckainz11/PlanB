import {useContext, useEffect, useState} from "react";
import firebase from "firebase";

export function useDatabaseValue(path: string | undefined) {
    const [value, setValue] = useState<firebase.database.DataSnapshot>();

    useEffect(() => {
        if (path) {
            const ref = firebase.database().ref(path);
            const subscription = ref.on("value", snapshot =>
            {
                setValue(() => snapshot);
            });
            return () => {
                ref.off("value", subscription)
            }
        } else {
            setValue(undefined);
        }
    }, [path]);

    return value;
}
