import firebase from 'firebase';
import {DataBaseElement} from "./DataBaseElement";

//TODO: Proposer service
export interface Session extends DataBaseElement{
    name: string
    date: Date
    start: firebase.firestore.Timestamp
    end: firebase.firestore.Timestamp
    endTime: string
    startTime: string
    description: string
    location: string
}
