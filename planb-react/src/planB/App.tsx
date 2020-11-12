import React, {useContext, useEffect} from 'react';
import logo from '../images/LogoPlanB.png';
// import './App.css';
import {FormField} from "semantic-ui-react";
import {ServiceDebug} from "./views/serviceDebug/ServiceDebug";


function App() {
    return (
        <div className="App">
            {/*<header className="App-header">*/}
            {/*    <img src={logo} className="App-logo" alt="logo"/>*/}
            {/*    <p>*/}
            {/*        Plan B haha funny*/}
            {/*    </p>*/}
            {/*    <a*/}
            {/*        className="App-link"*/}
            {/*        href="https://reactjs.org"*/}
            {/*        target="_blank"*/}
            {/*        rel="noopener noreferrer"*/}
            {/*    >*/}
            {/*        Logo go brrrrrr*/}
            {/*    </a>*/}
            {/*</header>*/}
            <ServiceDebug/>
        </div>
    );
}

export default App;
