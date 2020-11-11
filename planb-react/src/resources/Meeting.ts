import firebase from 'firebase';

export interface Meeting {
    name: String
    date: firebase.firestore.Timestamp
    start: firebase.firestore.Timestamp
    end: firebase.firestore.Timestamp
    description: String
    location: String
    proposer: String
}