import firebase from 'firebase';
import {DataBaseElement} from "./DataBaseElement";

export interface Session extends DataBaseElement{
    name: string
    date: firebase.firestore.Timestamp
    start: firebase.firestore.Timestamp
    end: firebase.firestore.Timestamp
    endTime: string
    startTime: string
    description: string
    location: string
    proposer: string
}
