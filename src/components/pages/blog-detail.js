import React, { Component } from 'react';
import axios from 'axios';
import ReactHtmlParser from "react-html-parser";

import FeaturedImage from "../blogs/featured-image"
import BlogForm from '../blogs/blog-form';

export default class BlogDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentId: this.props.match.params.permalink,
            blogItem: {},
            editMode: false,
        }

        this.handleEditStart = this.handleEditStart.bind(this);
        this.handleImageDelete = this.handleImageDelete.bind(this);
        this.handleFormUpdate = this.handleFormUpdate.bind(this);
    }

    handleFormUpdate(blog) {
        this.setState({
            blogItem: blog,
            editMode: false
        })
    }

    handleImageDelete() {
        this.setState({
            blogItem: {
                featured_image_url: "",
            }
        })
    }

    handleEditStart(event) {
        console.log("edit start")
        {this.props.loggedInStatus === "LOGGED_IN" ? (
        this.setState({ editMode: true})) : null}
    }

    getBlogItems() {
        axios({method: "get", url: `https://thundernation.devcamp.space/portfolio/portfolio_blogs/${this.state.currentId}`}).then(response => { this.setState ({blogItem: response.data.portfolio_blog})}).catch(error => {console.log("blog error", error)})
    }

    componentDidMount() {
        this.getBlogItems();
    }

    render() {
        const {
            title, content, featured_image_url, blog_status } = this.state.blogItem;
        
            const contentManager = () => {
                if (this.state.editMode) {
                    return <BlogForm handleFormUpdate={this.handleFormUpdate} handleImageDelete={this.handleImageDelete} editMode={this.state.editMode} blog={this.state.blogItem}/>
                } else { return (<div className="content-container">
                <h1 onDoubleClick={this.handleEditStart} >{title}</h1>

                <FeaturedImage img={featured_image_url} />

                <div onDoubleClick={this.handleEditStart} className="content">{ReactHtmlParser(content)}</div>
                </div>) }
            }

        return (
            <div className= "blog-container">{contentManager()}</div>
        );
    }
}