import {useCallback, useContext, useEffect, useRef, useState} from "react";
import {BServiceContext, useDatabaseValue} from "../index";
import {Band} from "../../resources/Band";

export function useBandService (): {bands: Array<Band> | undefined, selectBand: ((band: Band) => void)} {
    const BService = useContext(BServiceContext);
    const databaseValue:any = useDatabaseValue("/bandNames") || undefined;
    const bands: Array<Band> = databaseValue && Object.values(databaseValue);
    const bandDataRef = useRef(BService.firebaseSession.database().ref("/bandNames"));

    const selectBand = useCallback((band: Band) => {
        BService.selectedBand = band;
    }, [BService]);

    return {
        bands: bands,
        selectBand: selectBand
    };
}
