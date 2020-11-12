import React, {useContext, useEffect} from 'react';
import {Planner} from './views';
import './css/App.css';
import {BService} from "../services";
import 'semantic-ui-css/semantic.min.css'
import {Dropdown} from "semantic-ui-react";

const bService: BService = new BService();

export function App() {
    return (
        <div className="App">
            <Planner/>

        </div>
    );
}

export default App;
