import React, { Component } from 'react';
import { v4 as uuid } from 'uuid';

import NewPost from './NewPost';
import Post from './Post';


class PostList extends Component {
    constructor(props) {
        super(props)
        this.state = { posts: [] }
        this.createPost = this.createPost.bind(this);
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
                <NewPost create={this.createPost} />
                {this.renderPosts()}
            </div>
        );
    }
    
}

export default PostList;