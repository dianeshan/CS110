import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage } from '@fortawesome/free-solid-svg-icons';
import { v4 as uuid } from 'uuid';

import NewPost from './NewPost';
import Post from './Post';
import './ReplyButton.css';


class ReplyButton extends Component {
    constructor(props) {
        super(props)
        this.state = { posts: [], newForm: false, }
        this.newFormCheck = this.newFormCheck.bind(this)
        this.createPost = this.createPost.bind(this);
    }

    newFormCheck(event) {
        event.preventDefault();
        if (this.state.newForm) {
            this.setState({ newForm: false });
        }
        else {
            this.setState({ newForm: true });
        }

        // this.setState({ isNewMode: false });
        
        console.log("hello");
    
    }

    createPost(attrs) {
        const newPost = { ...attrs, id : uuid()} 
        this.setState({
            posts: [...this.state.posts, newPost]
        })
    }

    renderPosts() {
        console.log(this.state.posts);
        return this.state.posts.map(post => (
            <Post key={post.id} attrs={post} depth={0}/>
        ))
    }

    render() {
        return (
            <div>
            <button onClick={this.newFormCheck} className="btn reply-button"><FontAwesomeIcon icon={faMessage} /> Reply</button>
            {this.state.newForm ?
                    <NewPost create={this.createPost} />
                    : null}
                {this.renderPosts()}
            </div>
        )
    }
}

export default ReplyButton;