import React from 'react';
import {Login, Planner, ServiceView} from './views';
import './css/App.css';
import {BService, usePersonalService} from "./services";
import 'semantic-ui-css/semantic.min.css'
import {Route, Switch, Redirect } from 'react-router-dom';

const bService: BService = new BService();

export function App() {
    const [me] = usePersonalService();

    return (
        <div className="App">
            <Switch>
                <Route exact path="/">
                    {me == undefined ? <Login/> : <Redirect to="/planner"/>}
                </Route>
                <Route exact path="/console">
                    <ServiceView/>
                </Route>
                <Route path="/planner">
                    <Planner/>
                </Route>

            </Switch>
        </div>
    );
}

export default App;
