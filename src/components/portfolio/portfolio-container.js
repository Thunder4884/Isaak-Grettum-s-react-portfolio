import React, { Component } from "react";
import axios from 'axios';

import PortfolioItem from './portfolio-item';

export default class PortfolioContainer extends Component {
    constructor() {
        super();

        this.state = {
            isLoading: false,
            pageTitle: "Isaak's Portfolio ",
            data: [],
        };

        this.handleFilter = this.handleFilter.bind(this);

    }

    handleFilter (filter) {
        if (filter === "CLEAR_FILTERS") {this.componentDidMount();} else {
            this.getPortfolioItems(filter);
            }
        }
    

    getPortfolioItems(filter = null) {
        axios.get("https://thundernation.devcamp.space/portfolio/portfolio_items")
        .then(response =>  {
            if (filter) {
        this.setState({
                data: response.data.portfolio_items.filter(item => { return item.category === filter;}) });
            } else {
        this.setState({
            data: response.data.portfolio_items
          });
        }
      })

      .catch(error =>  {
        console.log(error);
      });
    }

    portfolioItems() {
        // Data that we'll need:
        //  - background image: thumb_image_url
        //  - logo: logo_url
        //  - description: description
        //  - id: id
        // Item list ["id", "name", "description", "url", "category", "position", "thumb_image_url", "banner_image_url", "logo_url", "column_names_merged_with_images"]
        return this.state.data.map(x => {
            return  <PortfolioItem key={x.id} x={x}/>;
        })
    }

    componentDidMount() {
        this.getPortfolioItems();
    }

    render() {

        if (this.state.isLoading) {
            return <div>Loading...</div>;
        }

        return(
            <div>
                <div className="filter-btn-wrapper">
                <button className="btn" onClick={() =>this.handleFilter('Technology')}>Technology</button>
                <button className="btn" onClick={() =>this.handleFilter('School')}>School</button>
                <button className="btn" onClick={() =>this.handleFilter('SocialMedia')}>Social Media</button>
                </div>
                <div className="portfolio-items-container">
                {this.portfolioItems()}
                </div>
                <div className="reset-btn one-column">
                <button className="btn" onClick={() => this.componentDidMount()}>All Items</button>
                </div>
            </div>
            
        );
    }
}