import {DataBaseElement} from "./DataBaseElement";

export interface User extends DataBaseElement{
    userName: string | undefined;
    email: string | undefined;
    photoUrl: string | undefined;
    emailVerified: boolean;
}
