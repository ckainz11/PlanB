import {useDatabaseValue} from "../index";
import {Band, Meeting} from "../../resources";
import {useEffect, useState} from "react";

export function useMeetingService(band: Band | undefined): { meetings: Meeting[] | undefined } {
    const databaseValue = useDatabaseValue(band ? `bandSpace/${band.name}/meetings` : undefined);
    const [meetings, setMeetings] = useState<Meeting[]>();

    useEffect(() => {
        if (databaseValue) {
            setMeetings(Object.keys(databaseValue.val()).map(key => {return {name: key,...databaseValue.val()[key]}}));
        } else {
            setMeetings(undefined);
        }
    }, [databaseValue]);

    return {
        meetings
    };
}
