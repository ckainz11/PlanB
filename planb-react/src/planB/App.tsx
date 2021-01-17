import React, {useEffect} from 'react';
import {Login, Planner, ServiceView} from './views';
import './css/App.css';
import {BService, usePersonalService} from "./services";
import 'semantic-ui-css/semantic.min.css'
import {Route, Switch, Redirect} from 'react-router-dom';


export function App() {
    const [me] = usePersonalService();

    return (
        <div className="App">
            <Switch>
                <Route exact path="/">
                    {me !== undefined ? <Planner/> : <Redirect to="/login"/>}
                </Route>
                <Route path="/login">
                    {me === undefined ? <Login/> : <Redirect to="/"/>}
                </Route>
                <Route exact path="/console">
                    <ServiceView/>
                </Route>


            </Switch>
        </div>
    );
}

export default App;
