import React, { Component } from "react";
import axios from 'axios';

import PortfolioItem from './portfolio-item';

export default class PortfolioContainer extends Component {
    constructor() {
        super();

        this.state = {
            isLoading: false,
            pageTitle: "Isaak's Portfolio ",
            data: []
        };

        this.handleFilter = this.handleFilter.bind(this);

    }

    handleFilter (filter) {
        this.setState({
            data: this.state.data.filter(i => {
                return i.category === filter;
            })
        });
    }

    getPortfolioItems() {
        axios.get("https://thundernation.devcamp.space/portfolio/portfolio_items")
        .then(response =>  {
          console.log("response data", response);
          this.setState({
              data: response.data.portfolio_items
          });
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
            
                <div className="portfolio-items-container">
                <button className="btn" onClick={() =>this.handleFilter('eCommerce')}>eCommerce</button>
                <button className="btn" onClick={() =>this.handleFilter('Scheduling')}>Scheduling</button>
                <button className="btn" onClick={() =>this.handleFilter('Enterprise')}>Enterprise</button>
                {this.portfolioItems()}
                </div>
            
        );
    }
}