import {DataBaseElement} from "./DataBaseElement";
import {User} from "./User";

export interface Vote extends DataBaseElement {
    user: User,
    value: number;
}
