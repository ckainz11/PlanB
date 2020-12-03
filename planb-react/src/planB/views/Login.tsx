import React, {useEffect} from "react";
import {usePersonalService} from "../services";
import {LoginHeader} from "../components/LoginHeader";
import purpleLogo from "../../images/LogoPlanB_purple.png";
import {Button, Image} from "semantic-ui-react";


export const Login = () => {

    const [me, personalOperation] = usePersonalService();



    return <div className={"login"} >
        <LoginHeader/>
        <h1>Welcome to</h1>
        <Image  size="huge" className={"login-logo"} src={purpleLogo} alt={"logo"}/>
        <Button size={"huge"} className={"color-positive"} onClick={() => personalOperation({type: "signInWithGoogle"})}>Authenticate with Google</Button>
    </div>
}
