import {useCallback, useContext} from "react";
import {BServiceContext, useDatabaseSpaceElements} from "../index";
import {Band} from "../../resources/Band";

export function useBandService(): {bands: (Array<Band> | undefined)} {
    const BService = useContext(BServiceContext);
    const bands = useDatabaseSpaceElements<Band>(`userSpace/${BService.selectedUser.uid}/bands`, 'bands');

    return {
        bands: bands
    };
}
