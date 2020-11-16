import {useDatabase, useDatabaseElements} from "..";
import {Band, Meeting, User} from "../../resources";
import {useEffect, useState} from "react";

export function useMeetingService(band: Band | undefined): (Meeting[] | undefined)[] {
    const [meetings] = useDatabaseElements<Meeting>(band && `bandSpace/${band.dataBaseID}/meetings`);
    return [
        meetings
    ];
}
