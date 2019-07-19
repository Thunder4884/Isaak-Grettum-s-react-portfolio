import React, { Component } from 'react';

const FeaturedImage = props => {

        if (!props.img)
        return null;

        if (props.img)
        return (
            <div className="featured-image-wrapper">
            <img src={props.img} />
            </div>
    );
        
}

export default FeaturedImage;