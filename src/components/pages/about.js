import React, { Component } from 'react';

import ContentForm from '../about/content-form';

class About extends Component {
    constructor() {
        super();

        this.state = {
            aboutModalIsOpen: false,
        }
    }
    
    render() {
        return (
            <div className="about-page-wrapper">   
                <ContentForm loggedInStatus={this.props.loggedInStatus} />
            </div>
        );
    }
}

export default About;