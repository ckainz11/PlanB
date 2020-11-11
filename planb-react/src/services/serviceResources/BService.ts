import FirebaseConfig from "./FirebaseConfig";
import firebase from "firebase/app"
import "firebase/auth";
import "firebase/database";
import {DefaultFirebaseConfig} from "./DefaultFirebaseConfig";
import {Band} from "../../resources/Band";
import {User} from "../../resources/User";

export class BService {
    selectedUser: User = {uid: "ChristophID"} as User;
    selectedBand: Band = {name: "FunnyBoysTM", description: "A funny Band haha"} as Band;

    constructor(config: FirebaseConfig = new DefaultFirebaseConfig()) {
        firebase.initializeApp(config);
    }
}
