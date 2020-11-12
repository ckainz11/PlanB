import {useCallback, useContext} from "react";
import {useDatabaseSpaceElements} from "..";
import {Band, User} from "../../resources";

export function useMemberService(band: Band | undefined): {members: (Array<User> | undefined)} {
    const members = useDatabaseSpaceElements<User>(band && `bandSpace/${band.name}/members`, 'users');

    return {
        members: members
    };
}
