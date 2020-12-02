import {useEffect, useReducer, useRef} from "react";
import firebase from "firebase";
import {DataBaseElement} from "../../resources";
import {ArrayAction, ArrayReducer} from "../../reducers/ArrayReducer";
import {type} from "os";

export function useDatabaseSpaceElements<T extends DataBaseElement>(pathToSpace: string | undefined, pathToElements: string | undefined): (T[] | undefined)[] {
    const [elements, dispatch] = useReducer(ArrayReducer, undefined);
    const listenersRef = useRef(new Map<string, any>());

    //If any path changes then reload all listeners
    useEffect(() => {
        if (pathToSpace && pathToElements) {
            //Store all open listeners in a map, to close them later
            const listeners: Map<string, any> = listenersRef.current;

            //Ref to the ids of the elements
            const ref = firebase.database().ref(pathToSpace);

            //Clear current elements
            dispatch({type: ArrayAction.undefine});

            //Check if there is at least one item. If yes, then set the array to clear
            ref.limitToFirst(1).once("value", (snapshot) => {
                if (!snapshot.val()) {
                    dispatch({type: ArrayAction.clear});
                }
            }, (err: any) => {if (err) console.error(err)});

            console.log("Path changesd")

            //Listen to ids of added element
            const childAdd = ref.on('child_added', function (childSnapshot) {
                if (childSnapshot.key) {
                    //Ref to the added element
                    const elementRef = firebase.database().ref(pathToElements + "/" + childSnapshot.key)

                    //Add a listener to listen to its value and store it for later cleaning
                    listeners.set(childSnapshot.key, elementRef.on("value", snapshot => {
                        //Update or add the element
                        snapshot.key && dispatch({
                            type: ArrayAction.change,
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
