import firebase from 'firebase';

export interface Meeting {
    name: string
    date: firebase.firestore.Timestamp
    start: firebase.firestore.Timestamp
    end: firebase.firestore.Timestamp
    description: string
    location: string
    proposer: string
}