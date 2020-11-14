import {DataBaseElement} from "../../resources";
import {useEffect, useReducer} from "react";
import firebase from "firebase";
import {ArrayAction, ArrayReducer} from "../../reducers/ArrayReducer";

export function useDatabaseElements<T extends DataBaseElement>(pathToElements: string | undefined): (T[] | undefined)[] {
    const [elements, dispatch] = useReducer(ArrayReducer, undefined);

    useEffect(() => {

        if (pathToElements) {
            const ref = firebase.database().ref(pathToElements);
            dispatch({type: ArrayAction.clear});
            ref.on('child_added', function (childSnapshot) {
                dispatch({type: ArrayAction.add, payload:{dataBaseID: childSnapshot.key, ...childSnapshot.val()}})
            });

            ref.on('child_changed', function (childSnapshot) {
                dispatch({type: ArrayAction.change, payload:{dataBaseID: childSnapshot.key, ...childSnapshot.val()}})
            });

            ref.on('child_removed', function (oldChildSnapshot) {
                dispatch({type: ArrayAction.remove, payload:{dataBaseID: oldChildSnapshot.key, ...oldChildSnapshot.val()}})
            });
        } else {
            dispatch({type: ArrayAction.undefine});
        }
    }, [pathToElements]);

    return [elements && elements as T[]];
}
