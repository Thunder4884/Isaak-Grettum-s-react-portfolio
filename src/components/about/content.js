import React from 'react';


const Content = props => {
    const {content, title} = props.formContent;

    return (
        <div>
            <div className="title">
            <h1>{title}</h1>
            </div>
            <div className="content">
                <h2>{content}</h2>
            </div>
        </div>
    );
}

export default Content;