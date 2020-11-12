import firebase from 'firebase';
import {DataBaseElement} from "./DataBaseElement";

export interface Meeting extends DataBaseElement{
    date: firebase.firestore.Timestamp
    start: firebase.firestore.Timestamp
    end: firebase.firestore.Timestamp
    description: String
    location: String
    proposer: String
}
