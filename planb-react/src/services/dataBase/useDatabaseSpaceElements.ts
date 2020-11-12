import {useEffect, useReducer} from "react";
import firebase from "firebase";
import {useDatabase} from "./useDatabase";
import {Band, DataBaseElement} from "../../resources";

function addArrayReducer(state: any, action: any): any {
    switch (action.type) {
        case "add":
            return [...state, action.payload];
        case "update":
            return [...state.filter((e: { dataBaseID: any; }) => e.dataBaseID !== action.payload.dataBaseID), action.payload];
        case "clear":
            return [];
        case "undefine":
            return undefined;
        default:
            throw new Error("Invalid action");
    }
}

export function useDatabaseSpaceElements<T extends DataBaseElement>(pathToSpace: string | undefined, pathToElements: string | undefined): (T[] | undefined)[]  {
    const [elements, dispatch] = useReducer(addArrayReducer, undefined);
    const [databaseValue] = useDatabase(pathToSpace);

    useEffect(() => {
        if (pathToSpace && pathToElements && databaseValue?.val()) {
            const names: Array<String> = Object.keys(databaseValue.val());
            dispatch({type: "clear"});
            const cleanUps: (() => void)[] = [];
            for (let name of names) {
                const ref = firebase.database().ref(pathToElements + "/" + name);
                const subscriptionAdd = ref.on("value", snapshot => {
                    dispatch({type: "update", payload: {dataBaseID: snapshot.key, ...snapshot.val()} as T});
                });

                cleanUps.push(() => ref.off("value", subscriptionAdd));
            }
            return (() => {cleanUps.forEach((e) => e())})
        } else {
            dispatch({type: "undefine"});
        }

    }, [pathToElements, databaseValue, pathToSpace]);

    return [elements];
}
