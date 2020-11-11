import {useEffect, useReducer} from "react";
import {Band} from "../../resources/Band";
import firebase from "firebase";
import {useDatabaseValue} from "./useDatabaseValue";

function addArrayReducer<T>(state:any, action:any):T[] {
    switch (action.type) {
        case "add":
            return [...state, action.payload] as T[]
        case "clear":
            return []  as T[];
        default:
            throw new Error("Invalid action");
    }
}

export function useDatabaseSpaceElements<T>(pathToSpace: string, pathToElements:string):T[] {
    const [elements, dispatch] = useReducer(addArrayReducer, [] as T[]);
    const databaseValue: any = useDatabaseValue(pathToSpace);

    useEffect( () => {
        if (databaseValue) {
            const bandNames:Array<String> = Object.keys(databaseValue);
            dispatch({type: "clear"});
            for (let name of bandNames) {
                firebase.database().ref(pathToElements + "/" + name).once("value").then(snapshot => {
                    if (snapshot.key) {
                        dispatch({type: "add", payload: {name: snapshot.key, ...snapshot.val()} as Band});
                    }
                });
            }
        }
    }, [pathToSpace, databaseValue]);

    return elements as T[];
}
