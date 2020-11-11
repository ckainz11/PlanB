import FirebaseConfig from "./FirebaseConfig";
import firebase from "firebase/app"
import "firebase/auth";
import "firebase/database";
import {DefaultFirebaseConfig} from "./DefaultFirebaseConfig";
import {Band} from "../../resources/Band";
import {User} from "../../resources/User";

export class BService {
    selectedUser: User = {uid: "FlorianID"} as User;
    selectedBand: Band | undefined;

    constructor(config: FirebaseConfig = new DefaultFirebaseConfig()) {
        firebase.initializeApp(config);
    }
}
