import {DataBaseElement} from "../../resources";
import {useEffect, useReducer} from "react";
import firebase from "firebase";
import {ArrayAction, ArrayReducer} from "../../reducers/ArrayReducer";

export function useDatabaseElements<T extends DataBaseElement>(pathToElements: string | undefined, orderByChild?: string): (T[] | undefined)[] {
    const [elements, dispatch] = useReducer(ArrayReducer, undefined);

    useEffect(() => {
        if (pathToElements) {
            const ref = orderByChild ? firebase.database().ref(pathToElements).orderByChild(orderByChild) : firebase.database().ref(pathToElements).orderByKey();
            dispatch({type: ArrayAction.clear});
            const childAdd = ref.on('child_added', function (childSnapshot, prevChildKey) {
                dispatch({type: ArrayAction.add, payload:{dataBaseID: childSnapshot.key, ...childSnapshot.val()}, prevChildKey})
            });

            const childChange = ref.on('child_changed', function (childSnapshot) {
                dispatch({type: ArrayAction.change, payload:{dataBaseID: childSnapshot.key, ...childSnapshot.val()}})
            });

            const childRemove = ref.on('child_removed', function (oldChildSnapshot) {
                dispatch({type: ArrayAction.remove, payload:{dataBaseID: oldChildSnapshot.key, ...oldChildSnapshot.val()}})

            });

            const childMove = ref.on('child_moved', function (childSnapshot, prevChildKey) {
                dispatch({type: ArrayAction.move, payload:{dataBaseID: childSnapshot.key, ...childSnapshot.val()}, prevChildKey: prevChildKey})
            });

            return () => {
                ref.off("child_added", childAdd);
                ref.off("child_changed", childChange);
                ref.off("child_removed", childRemove);
                ref.off("child_moved", childMove);
            }
        } else {
            dispatch({type: ArrayAction.undefine});
        }
    }, [pathToElements, orderByChild]);

    return [elements && elements as T[]];
}
