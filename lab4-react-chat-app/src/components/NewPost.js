import React, { Component } from 'react';
import './Post.css';


class NewPost extends Component {
    constructor(props) {
        super(props)
        this.state = { user : '', posttext : '', isNewMode: true }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(event) {
        event.preventDefault()
        this.props.create(this.state)
        this.setState({ user : '', posttext : ''})
    }

    handleChange(event){
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    render() {
        
        const SubmitButton = () => {
            if (this.state.user && this.state.posttext) {
                return <button className="btn btn-primary">Submit</button>
            } else {
                return <button className="btn btn-primary" disabled>Submit</button>
            };
        };
        
        return (
            <div>
                <div className="container pt-5 centered">
                    <div className="card w-50">
                        <div className="card-body">
                            <h4 className="card-title">{this.state.isNewMode ? 'New Post' : ''}</h4>
                            <form onSubmit={this.handleSubmit}>
                                <div className="mb-3">
                                    <input name="user" value={this.state.user} onChange={this.handleChange} required type="text" className="form-control" placeholder="Name..."/>
                                </div>
                                <div className="mb-3">
                                    <textarea name="posttext" value={this.state.posttext} onChange={this.handleChange} required className="form-control" placeholder="Write a new post..."/>
                                </div>
                                <div className="text-end">
                                    <SubmitButton />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default NewPost;