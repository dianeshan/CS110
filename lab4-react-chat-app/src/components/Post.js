import React, { Component } from 'react';

import Voter from './Voter';
//import ReplyButton from './ReplyButton';
// import Reply from './Reply';
import './Post.css';
import ReplyButton from './ReplyButton';

class Post extends Component {

    render() {
        const { user, posttext } = this.props.attrs
        // if (this.props.depth > 2)
        //     return null
        // console.log(posttext);
        // let componentClass = "main";
        // if (this.props.depth === 1)
        //     componentClass = "reply";
        // if (this.props.depth === 2)
        //     componentClass = "replyOfReply";
        return (
            <div className="container centered pt-3">
                <div className="w-50">
                    <div>
                        <div className="user">{user}</div>
                        <div className="posttext">
                            {posttext}
                            <span><Voter /></span>
                        </div>
                        <ReplyButton />
                    </div>
                </div>
                {/* <Post depth={this.props.depth + 1} attrs={this.props.attrs}/> */}
            </div>
        )
    }
}

export default Post;