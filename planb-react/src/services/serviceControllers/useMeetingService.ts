import {useDatabase, useDatabaseElements} from "..";
import {Band, Meeting} from "../../resources";
import {useEffect, useState} from "react";

export function useMeetingService(band: Band | undefined): { meetings: (Meeting[] | undefined) } {
    const [meetings] = useDatabaseElements<Meeting>(band && `bandSpace/${band.dataBaseID}/meetings`);

    return {
        meetings
    };
}
