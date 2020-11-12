import React, {useContext, useEffect} from 'react';
import {Planner} from './views';
import './css/App.css';

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
            {/*<ServiceDebug/>*/}
            <Planner/>
        </div>
    );
}

export default App;
