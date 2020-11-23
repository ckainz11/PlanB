import firebase from 'firebase';
import {DataBaseElement} from "./DataBaseElement";

export interface Session extends DataBaseElement{
    name: string
    start: Date
    end: Date
    description: string
    location: string
}
