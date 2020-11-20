import {DataBaseElement} from "./DataBaseElement";

export interface Song extends DataBaseElement{
    name: string;
    rating: number;
    content: string;
}
