import {useEffect, useReducer, useRef} from "react";
import firebase from "firebase";
import {useDatabase} from "./useDatabase";
import {Band, DataBaseElement} from "../../resources";
import {ArrayAction, ArrayReducer} from "../../reducers/ArrayReducer";

export function useDatabaseSpaceElements<T extends DataBaseElement>(pathToSpace: string | undefined, pathToElements: string | undefined): (T[] | undefined)[] {
    const [elements, dispatch] = useReducer(ArrayReducer, undefined);
    const listeners = useRef(new Map<string, any>());

    useEffect(() => {
        if (pathToSpace && pathToElements) {
            const ref = firebase.database().ref(pathToSpace).orderByKey();
            dispatch({type: ArrayAction.clear});

            const childAdd = ref.on('child_added', function (childSnapshot) {
                if (childSnapshot.key) {
                    const elementRef = firebase.database().ref(pathToElements + "/" + childSnapshot.key)
                    elementRef.once("value").then(snapshot => {
                        snapshot.key && dispatch({
                            type: ArrayAction.add,
                            payload: {dataBaseID: snapshot.key, ...snapshot.val()}
                        })
                    });

                    // let first = true;

                    listeners.current.set(childSnapshot.key, elementRef.on("value", snapshot => {
                        // if (first) first = false
                        // else {
                            snapshot.key && dispatch({
                                type: ArrayAction.change,
                                payload: {dataBaseID: snapshot.key, ...snapshot.val()}
                            })
                        // }
                    }));
                }
            });

            const childRemove = ref.on('child_removed', function (oldChildSnapshot) {
                if (oldChildSnapshot.key) {
                    listeners.current.delete(oldChildSnapshot.key);
                    dispatch({
                        type: ArrayAction.remove,
                        payload: {dataBaseID: oldChildSnapshot.key}
                    });
                }
            });

            return () => {
                ref.off("child_added", childAdd);
                ref.off("child_removed", childRemove);

                listeners.current.forEach((value, key) => {
                    ref.off("value", listeners.current.get(value));

                });

                listeners.current.clear();
            }
        } else {
            dispatch({type: ArrayAction.undefine});
        }
    }, [pathToElements, pathToSpace]);

    return [elements as T[] | undefined];
}
