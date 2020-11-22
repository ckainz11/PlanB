import firebase from 'firebase';
import {DataBaseElement} from "./DataBaseElement";

//TODO: Proposer service
export interface Session extends DataBaseElement{
    name: string
    start: Date
    end: Date
    description: string
    location: string
}
