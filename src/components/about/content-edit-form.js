import React, { Component } from 'react';
import DropzoneComponent from "react-dropzone-component";

import RichTextEditor from "../forms/rich-text-editor";

export default class ContentEditForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            content: "",
            featured_image: "",
            title: "",
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.componentConfig = this.componentConfig.bind(this);
        this.djsConfig = this.djsConfig.bind(this);
        this.handleImageDrop = this.handleImageDrop.bind(this);
        this.deleteImage = this.deleteImage.bind(this);

        this.imageRef = React.createRef();
    }

    deleteImage(imageType) {
        axios({method: "delete", url: `https://api.devcamp.space/portfolio/delete-portfolio-blog-image/${this.props.blog.id}?image_type=${imageType}`, withCredentials: true, }).then(response => { this.props.handleImageDelete(); }).catch(error => { console.log("deleteImage error", error);});
    }

    componentWillMount() {
        if (this.props.editMode) { this.setState({ title: this.props.formContent.title, content: this.props.formContent.content });
        }
    }

    handleImageDrop() {
        return {
            addedfile: file => this.setState({ featured_image: file})
        }
    }

    componentConfig() {
        return{
            iconFiletypes: [".jpg", ".png"],
            showFiletypeIcon: true,
            postUrl: "https://httpbin.org/post"
        }
    }

    djsConfig() {
        return{
            addRemoveLinks: true,
            maxFiles:1
        }
    }

    handleTextChange(content) {
        this.setState({ content });
    }

    buildForm() {
        let formData = new FormData();

        formData.append("portfolio_blog[title]", this.state.title)
        formData.append("portfolio_blog[blog_status]", this.state.blog_status)
        formData.append("portfolio_blog[content]", this.state.content)

        if (this.state.featured_image) {
            formData.append("portfolio_blog[featured_image]", this.state.featured_image)
        }

        return formData;
    }

    handleSubmit(event) {
        axios({ method: this.state.apiAction, url: this.state.apiUrl, withCredentials: true, data: this.buildForm() }).then(response => { if (this.state.featured_image) {this.imageRef.current.dropzone.removeAllFiles();} this.setState({ title: "", blog_status: "draft", content: "", featured_image: "" }); if (this.props.editMode) {this.props.handleFormUpdate(response.data.portfolio_blog);} else {this.props.handleOnSubmit(response.data.portfolio_blog);} }).catch(error => {console.log("submit error", error);});

        event.preventDefault();
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value })
    }

    render() {
        return (
            <form className="about-form-wrapper" onSubmit={this.handleSubmit}>
                <div className="one-column">
                    <input onChange={this.handleChange} type="text" name="title" placeholder="Title" value={this.state.title} ></input>
                </div>

                <div className="one-column"><RichTextEditor handleTextChange={this.handleTextChange} editMode={this.props.editMode} contentToEdit={this.props.editMode && this.props.formContent.content ? this.props.formContent.content : null} /></div>

                <div className="image-uploaders">
                    {this.props.editMode && this.props.formContent.featured_image_url ? ( <div className="portfolio-manager-image-wrapper"><img src={this.props.formContent.featured_image_url} /> <div className="image-removal-link"> <a onClick={() => this.deleteImage("featured_image")} >Remove file</a></div></div>) : 
                    (<DropzoneComponent  ref={this.imageRef} config={this.componentConfig()} djsConfig={this.djsConfig()} eventHandlers={this.handleImageDrop()} ><div className="dz-message">Featured Image</div></DropzoneComponent>)}
                </div>

                <button className="btn">Save</button>
            </form>
        );
    }
}
