import {useEffect, useReducer, useRef} from "react";
import firebase from "firebase";
import {DataBaseElement} from "../../resources";
import {ArrayAction, ArrayReducer} from "../../reducers/ArrayReducer";
import {type} from "os";

export function useDatabaseSpaceElements<T extends DataBaseElement>(pathToSpace: string | undefined, pathToElements: string | undefined): (T[] | undefined)[] {
    const [elements, dispatch] = useReducer(ArrayReducer, undefined);
    const listenersRef = useRef(new Map<string, any>());

    useEffect(() => {
        if (pathToSpace && pathToElements) {
            const listeners: Map<string, any> = listenersRef.current;
            const ref = firebase.database().ref(pathToSpace).orderByKey();

            dispatch({type: ArrayAction.undefine});

            ref.limitToFirst(1).once("value", (snapshot) => {
                if (!snapshot.val()) {
                    dispatch({type: ArrayAction.clear});
                }
            });

            const childAdd = ref.on('child_added', function (childSnapshot) {
                if (childSnapshot.key) {
                    const elementRef = firebase.database().ref(pathToElements + "/" + childSnapshot.key)
                    listeners.set(childSnapshot.key, elementRef.on("value", snapshot => {
                        snapshot.key && dispatch({
                            type: ArrayAction.add,
                            payload: {dataBaseID: snapshot.key, ...snapshot.val()}
                        })
                    }, (err: any) => {if (err) console.error(err)}));
                }
            }, (err: any) => {if (err) console.error(err)});

            const childRemove = ref.on('child_removed', function (oldChildSnapshot) {
                if (oldChildSnapshot.key) {
                    listeners.delete(oldChildSnapshot.key);
                    dispatch({
                        type: ArrayAction.remove,
                        payload: {dataBaseID: oldChildSnapshot.key}
                    });
                }
            }, (err: any) => {if (err) console.error(err)});

            return () => {
                ref.off("child_added", childAdd);
                ref.off("child_removed", childRemove);

                listeners.forEach((value) => {
                    ref.off("value", listeners.get(value));

                });

                listeners.clear();
            }
        } else {
            dispatch({type: ArrayAction.undefine});
        }
    }, [pathToElements, pathToSpace]);


    return [elements ? elements as T[] : undefined];
}
