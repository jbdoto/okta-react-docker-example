import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { LoginCallback, SecureRoute, Security } from '@okta/okta-react';
import Asteroids from './Asteroids';
import { Planets } from './Planets'
import { Moons } from './Moons'

function App() {
    return (
        <Router>
            <Security issuer='https://dev-83007986.okta.com/oauth2/default'
                      clientId='0oaqpe0xm4UcaLlmQ5d6'
                      redirectUri={window.location.origin + '/callback'}
                      pkce={true}>
                <SecureRoute path='/' exact={true} component={Asteroids}/>
                <Route path='/callback' component={LoginCallback}/>
                <SecureRoute path='/asteroids' component={Asteroids} />
                <Route path='/planets' component={Planets} />
                <Route path='/moons' component={Moons} />
            </Security>
        </Router>
    );
}

export default App;
