import {useContext, useEffect, useState} from "react";
import {Band} from "../../resources/Band";
import {BServiceContext} from "..";

export function useDatabaseValue (path: string) {
    const [value, setValue] = useState();
    const BService = useContext(BServiceContext);

    useEffect(() => {
        const ref = BService.firebaseSession.database().ref(path);
        const subscription = ref.on("value", snapshot => {
            setValue(() => snapshot.val());
        });
        return () => {ref.off("value", subscription)}
    }, [BService.firebaseSession, path]);

    return value as object | undefined;
}
