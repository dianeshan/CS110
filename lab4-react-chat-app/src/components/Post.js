import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage } from '@fortawesome/free-solid-svg-icons';

import PostForm from "./PostForm";
import Voter from "./Voter";
import "./Post.css";

const Post = ({
    post,
    replies,
    setActivePost,
    activePost,
    addPost,
    parentId = null,
    submitLabel,
    getReplies
}) => {
    const isReplying = activePost && activePost.id === post.id && activePost.type === "replying";

    const replyId = parentId ? parentId : post.id //assign id of parent
    console.log(parentId, post.id, replyId);
    
    return (
        <div key={post.id} className="container centered pt-3">
            <div className={submitLabel === "Reply" ? "w-100" : "w-50"}>
                <div>
                    <div className="user">{post.user}</div>
                    <div className="posttext">
                        {post.body}
                        <span><Voter /></span>
                    </div>
                     <button onClick={() => setActivePost({id: post.id, type: "replying", parentId: parentId})} className="btn reply-button"><FontAwesomeIcon icon={faMessage} /> Reply</button>

                    {isReplying && (
                        <PostForm submitLabel="Reply" handleSubmit={(user, posttext) => addPost(user, posttext, replyId)} />
                    )}

                    {replies.length > 0 && (
                        <div className="replies">
                            {replies.map((reply) => (
                                <Post
                                    post={reply}
                                    key={reply.id}
                                    setActivePost={setActivePost}
                                    activePost={activePost}
                                    addPost={addPost}
                                    parentId={post.id}
                                    submitLabel="Reply"
                                    replies={() => Post.getReplies(post.id)}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Post;