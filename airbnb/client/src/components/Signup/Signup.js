import React, { Component } from 'react';
import { Redirect } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';

import styles from './Signup.css';

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            imageUrl: ' ',
            name: {
                first: '',
                last: ''
            },
            redirect: false,
            usernameErrorText: '',
            passwordErrorText: '',
            firstNameErrorText: '',
            lastNameErrorText: ''
        };
    }

    handleClick(event) {
        if (!this.state.name.first) {
            this.setState({ firstNameErrorText: 'First name is required' });
        }
        if (!this.state.name.last) {
            this.setState({ lastNameErrorText: 'Last name is required' });
        }
        if (!this.state.email) {
            this.setState({ usernameErrorText: 'Email is required' });
        }
        if (!this.state.password) {
            this.setState({ passwordErrorText: 'Password is required' });
        }
        if (
            !this.state.password ||
            !this.state.email ||
            !this.state.name.first ||
            !this.state.name.last
        ) {
            return;
        }

        var apiBaseUrl = 'http://localhost:9000/api/users';

        var payload = {
            email: this.state.email,
            password: this.state.password,
            imageUrl: this.state.imageUrl,
            name: {
                first: this.state.name.first,
                last: this.state.name.last
            }
        };
        axios
            .post(apiBaseUrl + '/signup', payload)
            .then(response => {
                if (response.status === 200) {
                    localStorage.setItem('token', JSON.stringify(response.data.token));
                    localStorage.setItem('name', JSON.stringify(response.data.name));
                    setTimeout(() => {
                        this.setState({ redirect: true });
                    }, 500);
                } else if (response.status === 201) {
                    this.setState({ usernameErrorText: response.data.error });
                }
            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        const { redirect } = this.state;

        if (redirect) {
            return <Redirect to="/locations" />;
        }

        return (
            <div className={styles.container}>
                <MuiThemeProvider>
                    <div>
                        <AppBar
                            title="Signup"
                            showMenuIconButton={false}
                            style={{ backgroundColor: '#333333' }}
                        />
                        <TextField
                            className={style.text_field}
                            hintText="Enter Your First Name"
                            floatingLabelText="First Name"
                            fullWidth={true}
                            errorText={this.state.firstNameErrorText}
                            onChange={(event, newValue) => {
                                let name = this.state.name;
                                name.first = newValue;
                                this.setState({ name, firstNameErrorText: '' });
                            }}
                        />
                        <br />
                        <TextField
                            hintText="Enter Your Last Name"
                            fullWidth={true}
                            floatingLabelText="Last Name"
                            errorText={this.state.lastNameErrorText}
                            onChange={(event, newValue) => {
                                let name = this.state.name;
                                name.last = newValue;
                                this.setState({ name, lastNameErrorText: '' });
                            }}
                        />
                        <br />
                        <TextField
                            hintText="Enter Your Email"
                            type="email"
                            floatingLabelText="Email"
                            fullWidth={true}
                            errorText={this.state.usernameErrorText}
                            onChange={(event, newValue) =>
                                this.setState({ email: newValue, usernameErrorText: '' })}
                        />
                        <br />
                        <TextField
                            type="password"
                            hintText="Enter your Password"
                            floatingLabelText="Password"
                            fullWidth={true}
                            errorText={this.state.passwordErrorText}
                            onChange={(event, newValue) =>
                                this.setState({ password: newValue, passwordErrorText: '' })}
                        />
                        <br />
                        <RaisedButton
                            label="Submit"
                            style={style}
                            onClick={event => this.handleClick(event)}
                        />
                    </div>
                </MuiThemeProvider>
            </div>
        );
    }
}
const style = {
    marginTop: 20
};

export default Signup;
