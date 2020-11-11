import FirebaseConfig from "./FirebaseConfig";
import firebase from "firebase/app"
import "firebase/auth";
import "firebase/database";
import {DefaultFirebaseConfig} from "./DefaultFirebaseConfig";
import {Band} from "../../resources/Band";
import {User} from "../../resources/User";

export class BService {
    firebaseSession: firebase.app.App;

    selectedUser: User = {uid: "FlorianID", bands: ["Balls", "FunnyBoysTM"]};
    selectedBand: Band | undefined;


    constructor(config: FirebaseConfig = new DefaultFirebaseConfig()) {
        this.firebaseSession = firebase.initializeApp(config);
    }
}
