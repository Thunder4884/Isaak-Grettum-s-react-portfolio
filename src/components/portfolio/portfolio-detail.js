import React, { Component } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

export default class PortfolioDetail extends Component {
    constructor(props) {
        super(props);

        this.state= {
            portfolioItem: {}
        }

    }

    getPortfolioItem() {
        axios({method: "get", url: `https://thundernation.devcamp.space/portfolio/portfolio_items/${this.props.match.params.permalink}`, withCredentials: true}).then(response => this.setState({portfolioItem: response.data.portfolio_item}))
    }
    
    componentWillMount() {
        this.getPortfolioItem();
    }

    render() {
        const { name, description, url, category, thumb_image_url, banner_image_url, logo_url } = this.state.portfolioItem;    
        
        const bannerStyles ={ backgroundImage: `url(${banner_image_url})`, backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center center"};

        const logoStyles = {
            width: "200px"
        };

        return (
            <div className="portfolio-detail-wrapper">
            <div className="banner" styles={bannerStyles}><img style={logoStyles} src={logo_url} /></div>
            <div className="portfolio-detail-descriiption-wrapper">
                <div className="decription">{description}</div>
            </div>
            <div className="bottom-content-wrapper">
                <a href={url} className="site-Link" target="_blank" > Visit {name}</a>
            </div>
            </div>
        );
    }
}

