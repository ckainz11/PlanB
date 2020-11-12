import {useCallback, useContext} from "react";
import {useDatabaseSpaceElements} from "..";
import {Band, User} from "../../resources";

export function useBandService(user: User | undefined): {bands: (Array<Band> | undefined)} {
    const [bands] = useDatabaseSpaceElements<Band>(user && `userSpace/${user.dataBaseID}/bands`, 'bands');

    return {
        bands
    };
}
