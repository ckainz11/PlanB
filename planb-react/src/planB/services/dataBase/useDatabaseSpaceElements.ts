import {useEffect, useReducer, useRef} from "react";
import firebase from "firebase";
import {DataBaseElement} from "../../resources";
import {ArrayAction, ArrayReducer} from "../../reducers/ArrayReducer";
import {type} from "os";

export function useDatabaseSpaceElements<T extends DataBaseElement>(pathToSpace: string | undefined, pathToElements: string | undefined): (T[] | undefined)[] {
    const [elements, dispatch] = useReducer(ArrayReducer, undefined);

    //Be careful! This data structure was a vary bad idea... :(
    const listenersRef = useRef(new Map<string, [firebase.database.Reference, () => any]>());

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
            }, (err: any) => {
                if (err) console.error(err)
            });


            //Listen to ids of added element
            const childAdd = ref.on('child_added', function (childSnapshot) {
                if (childSnapshot.key) {
                    //Ref to the added element
                    const elementRef = firebase.database().ref(pathToElements + "/" + childSnapshot.key)

                    //Add a listener to listen to its value and store it for later cleaning
                     const elementListener = elementRef.on("value", snapshot => {
                        console.log("Band changed: "+snapshot.key)
                        //Update or add the element
                        snapshot.key && dispatch({
                            type: ArrayAction.change,
                            payload: {dataBaseID: snapshot.key, ...snapshot.val()}
                        })
                    }, (err: any) => {
                        if (err) console.error(err)
                    });

                    listeners.set(childSnapshot.key, [elementRef, elementListener]);
                }
            }, (err: any) => {
                if (err) console.error(err)
            });

            const childRemove = ref.on('child_removed', function (oldChildSnapshot) {
                console.log("Band removed from list: " + oldChildSnapshot.key)
                if (oldChildSnapshot.key) {
                    const listenerArr = listeners.get(oldChildSnapshot.key);
                    listenerArr[0].off("value", listenerArr[1]);
                    listeners.delete(oldChildSnapshot.key);
                    dispatch({
                        type: ArrayAction.remove,
                        payload: {dataBaseID: oldChildSnapshot.key}
                    });
                }
            }, (err: any) => {
                if (err) console.error(err)
            });

            return () => {
                ref.off("child_added", childAdd);
                ref.off("child_removed", childRemove);

                listeners.forEach((value) => {
                    value[0].off("value", listeners.get(value[1]));
                });

                listeners.clear();
            }
        } else {
            dispatch({type: ArrayAction.undefine});
        }
    }, [pathToElements, pathToSpace]);


    return [elements ? elements as T[] : undefined];
}
