
import firebase from "firebase/app"
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAc65lCybATtAPsJAsT4V29AiANZHRjQzA",
    authDomain: "planb-52462.firebaseapp.com",
    databaseURL: "https://planb-52462.firebaseio.com",
    projectId: "planb-52462",
    storageBucket: "planb-52462.appspot.com",
    messagingSenderId: "941368877006",
    appId: "1:941368877006:web:c01a6ef764569e39c5159f"
};

const planBSession: firebase.app.App = firebase.initializeApp(firebaseConfig);

export const usePlanB = () => {
    return planBSession;
}
