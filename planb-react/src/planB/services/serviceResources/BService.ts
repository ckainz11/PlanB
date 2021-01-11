import FirebaseConfig from "./FirebaseConfig";
import firebase from "firebase/app"
import "firebase/auth";
import "firebase/database";
import {DefaultFirebaseConfig} from "./DefaultFirebaseConfig";

export class BService {
    // selectedUser: User = {uid: "FlorianID"} as User;
    // selectedBand: Band = {name: "FunnyBoysTM", description: "A funny Band haha"} as Band;
    public app: firebase.app.App;

    constructor(config: FirebaseConfig = new DefaultFirebaseConfig()) {
        this.app = firebase.initializeApp(config);
    }
}
