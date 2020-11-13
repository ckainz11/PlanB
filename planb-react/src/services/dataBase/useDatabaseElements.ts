import {DataBaseElement} from "../../resources";
import {useDatabase} from "./useDatabase";
import {useEffect, useReducer, useState} from "react";
import firebase from "firebase";

enum arrayAction {
    add,
    change,
    remove,
    clear,
    undefine,
}

function addArrayReducer<T extends DataBaseElement>(state: undefined | T[], action: { type: arrayAction.add | arrayAction.change | arrayAction.remove; payload: T} | {type: arrayAction.clear | arrayAction.undefine}): undefined | T[] {
    switch (action.type) {
        case arrayAction.add:
            return state && action.payload && [...state, action.payload];
        case arrayAction.change:
            return action.payload && state && [...state.filter((e) => action.payload?.dataBaseID && e.dataBaseID !== action.payload.dataBaseID), action.payload];
        case arrayAction.remove:
            return action.payload && state && [...state.filter((e) => action.payload?.dataBaseID && e.dataBaseID !== action.payload.dataBaseID)];
        case arrayAction.clear:
            return [];
        case arrayAction.undefine:
            return undefined;
        default:
            throw new Error("Invalid action");
    }
}

export function useDatabaseElements<T extends DataBaseElement>(pathToElements: string | undefined): (T[] | undefined)[] {
    const [elements, dispatch] = useReducer(addArrayReducer, undefined);

    useEffect(() => {
        dispatch({type: arrayAction.clear});

        if (pathToElements) {
            const ref = firebase.database().ref(pathToElements);
            ref.on('child_added', function (childSnapshot) {
                dispatch({type: arrayAction.add, payload:{dataBaseID: childSnapshot.key, ...childSnapshot.val()}})
            });

            ref.on('child_removed', function (oldChildSnapshot) {
                dispatch({type: arrayAction.remove, payload:{dataBaseID: oldChildSnapshot.key, ...oldChildSnapshot.val()}})
            });

            ref.on('child_changed', function (childSnapshot) {
                dispatch({type: arrayAction.remove, payload:{dataBaseID: childSnapshot.key, ...childSnapshot.val()}})
            });
        } else {
            dispatch({type: arrayAction.undefine});
        }

    }, [pathToElements]);

    return [elements && elements as T[]];
}
