import React, { Component } from 'react';

import Content from './content';
import aboutImg from '../../../static/assets/images/images/Thunder_Nation_Logo.png'
import ContentEditForm from "./content-edit-form";



export default class ContentForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            editMode: false,
            formContent:{
                content:"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aspernatur cupiditate unde incidunt, suscipit, eaque officia explicabo praesentium quidem nesciunt facere ipsum dolores similique, repudiandae nostrum. Ipsum aut explicabo tempore blanditiis! Quibusdam ut eos error optio, impedit provident quisquam at beatae autem inventore doloribus voluptatem excepturi iste qui tenetur. Consectetur facilis molestiae quibusdam quaerat? Tempore, quisquam ipsa a officiis voluptatibus asperiores. Ipsum, fugit veniam incidunt et offica.",
                title: "About",
                featured_image_url: "",
            }
        }

        this.handleEditStart = this.handleEditStart.bind(this);
        this.handleImageDelete = this.handleImageDelete.bind(this);
        this.handleFormUpdate = this.handleFormUpdate.bind(this);
        this.handleModalClose = this.handleModalClose.bind(this);
        this.handleModalOpen = this.handleModalOpen.bind(this);
    }

    handleModalOpen() {
        this.setState({ blogModalIsOpen: true});
    }

    handleModalClose() {
        this.setState({ blogModalIsOpen: false});
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
        {this.props.loggedInStatus === "LOGGED_IN" ? ( console.log("edit start"),
        this.setState({editMode: true})) : null}
    }

    render() {
        const contentManager = () => {
            if (this.state.editMode) {return <ContentEditForm handleFormUpdate={this.handleFormUpdate} handleImageDelete={this.handleImageDelete} formContent={this.state.formContent} editMode={this.state.editMode}/> }
            else {return (
            <div onDoubleClick={this.handleEditStart} className="content-wrapper">
                <div className="content-container"><Content formContent={this.state.formContent} /></div>
            </div>)}}

        return (
            <div className="two-column">
            <div className="left-column" style={{backgroundImage: `url(${aboutImg})`}}>
            {/* background image // position relative? */}
            </div>

            <div className="right-column">
                {/* centered content // click editor // modal for editor */}
                <div>{contentManager()}</div>
            </div>
            </div>
        );
    }
}
