import {DataBaseElement} from "./DataBaseElement";

export interface User extends DataBaseElement{
    userName: string | null;
    email: string | null;
    photoUrl: string | null;
    emailVerified: boolean;
}
