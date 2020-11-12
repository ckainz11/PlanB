import React from 'react';
import {Planner} from './views';
import './css/App.css';
import {BService} from "../services";
import 'semantic-ui-css/semantic.min.css'
import {Route, Switch } from 'react-router-dom';
import {ServiceDebug} from "./views/ServiceDebug";

const bService: BService = new BService();

export function App() {
    return (
        <div className="App">
            <Switch>
                <Route exact path="/console">
                    <ServiceDebug/>
                </Route>
                <Route path="/">
                    <Planner/>
                </Route>
            </Switch>
        </div>
    );
}

export default App;
