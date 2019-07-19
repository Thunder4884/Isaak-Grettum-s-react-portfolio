import React, { Component } from 'react';
import axios from 'axios';

import PortfolioForm from "../portfolio/portfolio-form";
import PortfolioSidebarList from "../portfolio/portfolio-sidebar-list";

export default class PortfolioManager extends Component {
    constructor() {
        super();

        this.state = {
            data: [],
            dataToEdit: {}
        };

        this.handleFormSubmissionError = this.handleFormSubmissionError.bind(this);
        this.handleNewFormSubmission = this.handleNewFormSubmission.bind(this);
        this.handleEditedFormSubmission = this.handleEditedFormSubmission.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.clearDataToEdit = this.clearDataToEdit.bind(this);
    }

        clearDataToEdit() {
            this.setState({ dataToEdit: {} });
        }

        handleEdit(portfolioItem) {
            this.setState({ dataToEdit: portfolioItem });
        }

        handleDelete(portfolioItem) {
             axios.delete(`https://api.devcamp.space/portfolio/portfolio_items/${portfolioItem.id}`, { withCredentials: true }).then(response => { this.setState({ data: this.state.data.filter(item => { return item.id !== portfolioItem.id;})}); return response.data;}).catch(error => {console.log("delete error", error);})
        }

        handleNewFormSubmission(portfolioItem) {
            this.setState({
            data: [portfolioItem].concat(this.state.data)
            })
        }

        handleEditedFormSubmission() {
            this.getPortfolioItems();
        }

        handleFormSubmissionError(error) {
            console.log("handleFormSubmissionError", error);
        }

        getPortfolioItems() {
            axios.get("https://thundernation.devcamp.space/portfolio/portfolio_items?order_by=created_at&direction=desc", { withCredentials: true })
            .then(response =>  {
              console.log("response data", response);
              this.setState({
                  data: [...response.data.portfolio_items]
              });
          })
    
          .catch(error =>  {
            console.log("portMan error", error);
          });
        }
    
        componentDidMount() {
            this.getPortfolioItems();
        }
    
    render() {
        return (
        <div className="portMan-page-wrapper">
            <div className= "left-column">
               <PortfolioForm handleNewFormSubmission= {this.handleNewFormSubmission} handleEditedFormSubmission= {this.handleEditedFormSubmission} handleFormSubmissionError= {this.handleFormSubmissionError} clearDataToEdit={this.clearDataToEdit} dataToEdit={this.state.dataToEdit} />
            </div>

            <div className= "right-column">
                <PortfolioSidebarList data={this.state.data} handleDelete={this.handleDelete} handleEdit={this.handleEdit} />
            </div>
        </div>
        );
    }
}