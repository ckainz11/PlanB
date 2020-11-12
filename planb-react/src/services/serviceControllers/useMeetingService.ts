import {useDatabaseValue} from "..";
import {Band, Meeting} from "../../resources";
import {useEffect, useState} from "react";

export function useMeetingService(band: Band | undefined): { meetings: Meeting[] | undefined } {
    const databaseValue = useDatabaseValue(band ? `bandSpace/${band.dataBaseID}/meetings` : undefined);
    const [meetings, setMeetings] = useState<Meeting[]>();

    useEffect(() => {
        if (databaseValue?.val()) {
            setMeetings(Object.keys(databaseValue?.val()).map(key => {return {dataBaseID: key,...databaseValue?.val()[key]}}));
        } else {
            setMeetings(undefined);
        }
    }, [databaseValue]);

    return {
        meetings
    };
}
