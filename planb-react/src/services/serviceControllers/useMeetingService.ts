import {useDatabase, useDatabaseElements} from "..";
import {Band, Session, User} from "../../resources";
import {useEffect, useState} from "react";

export function useSessionService(band: Band | undefined): (Session[] | undefined)[] {
    const [meetings] = useDatabaseElements<Session>(band && `bandSpace/${band.dataBaseID}/meetings`);
    return [
        meetings
    ];
}
