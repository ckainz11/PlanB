import {Band, Session, User} from "../../resources";
import {useDatabase, useDatabaseSpaceElements} from "../index";
import {useCallback} from "react";
import firebase from "firebase";
import {useDatabaseSingleElement} from "../dataBase/useDatabaseSingleElement";

export function useProposerService(band: Band | undefined, session: Session| undefined): (User | undefined)[] {
    const proposerId = useDatabase(session && band && `bandSpace/${band.dataBaseID}/sessions/${session.dataBaseID}/proposer`)[0]?.val();
    const [proposer] = useDatabaseSingleElement<User>(proposerId && `users/${proposerId}`);

    return [proposer];
}
