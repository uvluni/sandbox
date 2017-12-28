import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import NavBar from '../NavBar/NavBar';
import Home from '../Home/Home';
import About from '../About/About';
import Login from '../Login/Login';
import Signup from '../Signup/Signup';
import Location from '../location/Location/Location';
import Locations from '../locations/Locations/Locations';
import Profile from '../Profile/Profile';

const PrivateRoute = ({ component: Profile, isAuthenticated, ...rest }) =>
    <Route
        {...rest}
        render={props =>
            isAuthenticated
                ? <Profile {...props} />
                : <Redirect
                      to={{
                          pathname: '/login',
                          state: { from: props.location }
                      }}
                  />}
    />;

class App extends Component {
    constructor() {
        super();
        this.state = {
            redirectToReferrer: false,
            isAuthenticated: true
        };
    }

    render() {
        return (
            <Router>
                <div className="app">
                    <NavBar />
                    <Route exact path="/" component={Home} />
                    <Route path="/about" component={About} />
                    <Route exact path="/locations" component={Locations} />
                    <Route path="/locations/:locationId" component={Location} />
                    <Route path="/login" component={Login} />
                    <Route path="/signup" component={Signup} />

                    <PrivateRoute
                        path="/profile/:userId"
                        isAuthenticated={this.state.isAuthenticated}
                        component={Profile}
                    />
                </div>
            </Router>
        );
    }
}

export default App;
