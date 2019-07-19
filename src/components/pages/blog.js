import React, { Component } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import BlogItem from "../blogs/blog-item";
import BlogModal from "../modals/blog-modal";

class Blog extends Component {
    constructor() {
        super();

        this.state = {
            blogItems: [],
            totalCount: 0,
            currentPage: 0,
            isLoading: true,
            blogModalIsOpen: false,
            deleteMode: false,
        }

        this.getBlogItems = this.getBlogItems.bind(this);
        this.onScroll = this.onScroll.bind(this);
        window.addEventListener("scroll", this.onScroll, false);
        this.handleModalOpen = this.handleModalOpen.bind(this);
        this.handleModalClose = this.handleModalClose.bind(this);
        this.handleNewBlog = this.handleNewBlog.bind(this);
        this.handleBlogDelete = this.handleBlogDelete.bind(this);
        this.handleDelModeToggle = this.handleDelModeToggle.bind(this);

    }

    handleDelModeToggle() {
        {!this.state.deleteMode ? this.setState({deleteMode: true}) : this.setState({deleteMode: false})};
    }

    handleBlogDelete(blog) {
        axios({method: "delete", url: `https://api.devcamp.space/portfolio/portfolio_blogs/${blog.id}`, withCredentials: true}).then(response => {this.setState({blogItems: this.state.blogItems.filter(blogItem => {return blog.id !== blogItem.id})}), (console.log("item deleted", response))}).catch(error => console.log("blog del error", error))
    }

    handleNewBlog(blog) {
        this.setState({
            blogModalIsOpen: false,
            blogItems: [blog].concat(this.state.blogItems)
        })
    }

    handleModalOpen() {
        this.setState({ blogModalIsOpen: true});
    }

    handleModalClose() {
        this.setState({ blogModalIsOpen: false});
    }

    onScroll() {
        if (this.state.isLoading || this.state.blogItems.length === this.state.totalCount) {return;} if (window.innerHeight + Math.round(document.documentElement.scrollTop) === document.documentElement.offsetHeight) {
            this.getBlogItems();
        }
    }

    getBlogItems() {
        this.setState({ currentPage: this.state.currentPage + 1});
        axios.get(`https://thundernation.devcamp.space/portfolio/portfolio_blogs?page=${this.state.currentPage}`, { withCredentials: true }).then(response => { console.log("getting", response.data); this.setState({blogItems: this.state.blogItems.concat(response.data.portfolio_blogs), totalCount: response.data.meta.total_records, isLoading: false}); }).catch(error => {console.log("getBlogItems error", error);});
    }

    componentWillMount() {
        this.getBlogItems();
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.onScroll, false);
    }

    render() {
        const blogRecords = this.state.blogItems.map(blogItem => {
            if (this.props.loggedInStatus === "LOGGED_IN") {return <div key={blogItem.id} className="admin-blog-wrapper"><BlogItem blogItem={blogItem} />{this.state.deleteMode ? <a className="trash" onClick={() => this.handleBlogDelete(blogItem)}><FontAwesomeIcon icon="trash" /></a> : null}</div>
        } else {return <BlogItem key={blogItem.id} blogItem={blogItem} />;}
        });

        return (
            <div className="blog-container">
            <BlogModal handleNewBlog={this.handleNewBlog} modalIsOpen={this.state.blogModalIsOpen} handleModalClose={this.handleModalClose} />
        
        {this.props.loggedInStatus === "LOGGED_IN" ?
        <div className="del-blog-link">
            <a onClick={this.handleDelModeToggle}><FontAwesomeIcon icon="minus-circle" /> </a>
    </div> : null}

        {this.props.loggedInStatus === "LOGGED_IN" ?
        <div className="new-blog-link">
            <a onClick={this.handleModalOpen}><FontAwesomeIcon icon="plus-circle" /> </a>
    </div> : null}

                <div className="content-container">{blogRecords}</div>
                
                {this.state.isLoading ? (
                <div className="content-loader"><FontAwesomeIcon icon="cog" spin /></div>) : null}
            </div>
        );
    }
}

export default Blog;