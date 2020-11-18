import {DataBaseElement} from "./DataBaseElement";

export interface Song extends DataBaseElement{
    rating: number;
    content: string;
}
