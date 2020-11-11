import {useCallback, useContext} from "react";
import {BServiceContext, useDatabaseSpaceElements, useDatabaseValue} from "../index";
import {Meeting} from "../../resources";
import {Band} from "../../resources/Band";

export function useMeetingService(band:Band | undefined): { meetings: Meeting[] | undefined } {
    const databaseValue: any = useDatabaseValue(band ? `bandSpace/${band.name}/meetings` : undefined);
    const meetings: Meeting[] = databaseValue ? Object.keys(databaseValue).map(key => databaseValue[key] as Meeting) : [];

    return {
        meetings
    };
}
