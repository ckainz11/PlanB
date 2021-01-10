import React from "react";
import {usePersonalService} from "../services";
import {LoginHeader} from "../components/LoginHeader";
import purpleLogo from "../../images/LogoPlanB_purple.png";
import {Button, Container, Divider, Icon, Image} from "semantic-ui-react";
import 'semantic-ui-css/semantic.min.css';

export const Login = () => {

    const [me, personalOperation] = usePersonalService();


    return <div className={"login"}>
        <LoginHeader/>
        <h1>Welcome to</h1>
        <Image size="huge" className={"login-logo"} src={purpleLogo} alt={"logo"}/>
        <Button size={"huge"} icon="google" className={"color-positive"}
                onClick={() => personalOperation({type: "signInWithGoogle"})}>Authenticate with Google</Button>
        <Button size={"huge"} icon="github" className={"color-positive "}
                   onClick={() => personalOperation({type: "signInWithGithub"})}>Authenticate with Github</Button>
    </div>
}
