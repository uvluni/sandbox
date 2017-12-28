import React, { Component } from 'react';

class Profile extends Component {
    constructor() {
        super();
        this.state = {
            redirectToReferrer: false
        };
    }

    componentDidMount() {
        console.log('sss');
    }

    render() {
        return (
            <div>
                <h1> Profile </h1>
            </div>
        );
    }
}

export default Profile;
