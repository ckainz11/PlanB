import firebase from 'firebase';
import {DataBaseElement} from "./DataBaseElement";

export interface Meeting extends DataBaseElement{
    name: string
    date: firebase.firestore.Timestamp
    start: firebase.firestore.Timestamp
    end: firebase.firestore.Timestamp
    description: string
    location: string
    proposer: string
}