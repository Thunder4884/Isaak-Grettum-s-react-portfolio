import React, { Component } from 'react';

import loginImg from "../../../static/assets/images/images/authentication/login.jpg";
import Login from "../authentication/login";

export default class Authentication extends Component {
    constructor(props) {
        super(props);

        this.handleSuccessfulAuthentication = this.handleSuccessfulAuthentication.bind(this);
        this.handleUnsuccessfulAuthentication = this.handleUnsuccessfulAuthentication.bind(this);
    }

    handleSuccessfulAuthentication() {
        this.props.handleSuccessfulLogin();
        this.props.history.push("/");
    }

    handleUnsuccessfulAuthentication() {
        this.props.handleFailedLogin();
    }

    render() {
        return (
            <div className='auth-page-wrapper'>
                <div className="left-column" style={{backgroundImage: `url(${loginImg})`}} />

                <div className="right-column">
                <Login handleSuccessfulAuthentication={this.handleSuccessfulAuthentication} handleUnsuccessfulAuthentication={this.handleUnsuccessfulAuthentication} />                
                </div>
            </div>
        );
    }
}