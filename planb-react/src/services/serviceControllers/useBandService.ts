import {useCallback, useContext, useEffect, useReducer} from "react";
import {BServiceContext, useDatabaseValue} from "../index";
import firebase from "firebase";
import {Band} from "../../resources/Band";

function addArrayReducer (state:Array<Band>, action:any) {
    switch (action.type) {
        case "add":
            return [...state, action.payload] as Band[]
        case "clear":
            return []  as Band[];
        default:
            throw new Error("Invalid action")
    }
}

export function useBandService(): { bands: Array<Band> | undefined, selectBand: ((band: Band) => void) } {
    const BService = useContext(BServiceContext);
    const databaseValue: any = useDatabaseValue(`userSpace/${BService.selectedUser.uid}/bands`) || undefined;
    const [bands, bandDispatch] = useReducer(addArrayReducer, [] as Band[]);

    useEffect( () => {
        if (databaseValue) {
            const bandNames:Array<String> = Object.keys(databaseValue);
            bandDispatch({type: "clear"});
            for (let name of bandNames) {
                firebase.database().ref("bands/" + name).once("value").then(snapshot => {
                    if (snapshot.key) {
                        bandDispatch({type: "add", payload: {name: snapshot.key, ...snapshot.val()} as Band});
                    }
                });
            }
        }
    }, [databaseValue])

    const selectBand = useCallback((band: Band) => {
        BService.selectedBand = band;
    }, [BService]);

    return {
        bands: bands,
        selectBand: selectBand
    };
}
