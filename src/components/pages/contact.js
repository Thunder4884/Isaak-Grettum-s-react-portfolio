import React from 'react';
import loginImg from "../../../static/assets/images/images/authentication/login.jpg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function() {
    return (
        <div className="two-column">
        
        <div className="left-column" style={{backgroundImage: `url(${loginImg})`}} />
        
        <div className="right-column">
            <div className="info-container">
            <div className="form-group">
                <FontAwesomeIcon icon="phone" />
                <h1>555-555-5555</h1>
            </div>
            <div className="form-group">
                <FontAwesomeIcon icon="at" />
                <h1>Sgrettum@gmail.com</h1>
            </div>
            <div className="form-group">
                <FontAwesomeIcon icon="map-marker-alt" />
                <h1>Saratoga Springs, UT</h1>
            </div>
            </div>
        </div>
        </div>
    );
}