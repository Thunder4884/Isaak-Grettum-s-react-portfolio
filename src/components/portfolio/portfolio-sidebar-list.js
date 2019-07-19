import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const PortfolioSidebarList = props => {
    const portfolioList = props.data.map(portfolioItem => {
        return (
        <div key={ portfolioItem.id } className="portfolio-item-thumb">
        <div className="portfolio-thumb-img">
            <img src={portfolioItem.thumb_image_url} />
        </div>
        <div className="portMan-item-sub"> 
            <div className="title">{portfolioItem.name}</div>
            <div className="edit-icons">
                <a className="edit" onClick={() => props.handleEdit(portfolioItem)}><FontAwesomeIcon icon="tools" /></a> 
                <a className="trash" onClick={() => props.handleDelete(portfolioItem)}><FontAwesomeIcon icon="trash" /></a>
            </div>
        </div>
        </div>
        );
    });

    return <div className="portfolio-sidebar-list-wrapper">{portfolioList}</div>;
};

export default PortfolioSidebarList;