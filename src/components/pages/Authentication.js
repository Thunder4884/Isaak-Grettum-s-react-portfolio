import React, { Component } from 'react';

import loginImg from "../../../static/assets/images/images/authentication/login.jpg"
import Login from "../authentication/login"

export default class Authentication extends Component {
    render() {
        return (
            <div className='auth-page-wrapper'>
                <div className="left-column" style={{backgroundImage: `url(${loginImg})`}} />

                <div className="right-column">
                <Login />                
                </div>
            </div>
        );
    }
}