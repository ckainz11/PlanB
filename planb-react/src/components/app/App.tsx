import React, {useEffect} from 'react';
import logo from '../../images/LogoPlanB.png';
import './App.css';
import {FormField} from "semantic-ui-react";
import {usePlanB} from "../../services/usePlanB";

export const PlanBSessionContext = React.createContext({});

function App() {
    const PlanB = usePlanB();

    return (
        <PlanBSessionContext.Provider value={PlanB}>
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <p>
                        Plan B haha funny
                    </p>
                    <a
                        className="App-link"
                        href="https://reactjs.org"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Logo go brrrrrr
                    </a>
                </header>
            </div>
        </PlanBSessionContext.Provider>
    );
}

export default App;
