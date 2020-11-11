import {useEffect, useReducer} from "react";
import firebase from "firebase";
import {useDatabaseValue} from "./useDatabaseValue";
import {Band} from "../../resources";

function addArrayReducer<T extends {name: string}>(state: T[], action: any): T[] {
    switch (action.type) {
        case "add":
            return [...state, action.payload] as T[]
        case "update":
            return [...state.filter(e => e.name !== action.payload.name), action.payload];
        case "clear":
            return [] as T[];
        default:
            throw new Error("Invalid action");
    }
}

export function useDatabaseSpaceElements<T extends {name: string}>(pathToSpace: string | undefined, pathToElements: string): T[] {
    const [elements, dispatch] = useReducer(addArrayReducer, [] as T[]);
    const databaseValue = useDatabaseValue(pathToSpace);


    useEffect(() => {
        if (databaseValue) {
            const names: Array<String> = Object.keys(databaseValue.val());
            dispatch({type: "clear"});
            const cleanUps: (() => void)[] = [];
            for (let name of names) {
                const ref = firebase.database().ref(pathToElements + "/" + name);
                const subscriptionAdd = ref.on("value", snapshot => {
                    dispatch({type: "update", payload: {name: snapshot.key, ...snapshot.val()} as T});
                });

                cleanUps.push(() => ref.off("value", subscriptionAdd));
            }
            return (() => {cleanUps.forEach((e) => e())})
        }
    }, [pathToElements, databaseValue]);

    return elements as T[];
}
