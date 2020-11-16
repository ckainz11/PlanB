import {Band, User} from "../../resources";
import {useDatabaseSpaceElements} from "..";

export function useMemberService(band: Band | undefined): (User[] | undefined)[] {
    const [members] = useDatabaseSpaceElements<User>(band && `bandSpace/${band.dataBaseID}/members`, 'users');
    return [
        members
    ];
}
