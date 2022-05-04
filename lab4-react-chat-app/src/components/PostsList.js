import { useState } from "react";

import PostForm from "./PostForm";
import Post from "./Post";
import "./Post.css";

const PostsList = () => {
    const [allPosts, setAllPosts] = useState([]);
    const [activePost, setActivePost] = useState(null);
    const rootPosts = allPosts.filter(
      (allPost) => allPost.parentId === null  
    );

    const getReplies = (postId) =>
        allPosts.filter((oldPost) => oldPost.parentId === postId);
    
    const addPost = (user, posttext, parentId) => {
        createPost(user, posttext, parentId).then((post) => {
            setAllPosts([...allPosts, post]);
            setActivePost(null);
        });
    };

  return (
    <div>
      <PostForm submitLabel="Write" handleSubmit={addPost} />
      <div>
        {rootPosts.map((rootPost) => (
          <Post
            key={rootPost.id}
            post={rootPost}
            replies={getReplies(rootPost.id)}
            activePost={activePost}
            setActivePost={setActivePost}
            submitLabel="Write"
            addPost={addPost}
          />
        ))}
      </div>
    </div>
  );     
};

export const createPost = async (user, posttext, parentId = null) => {
  let commentId = Math.random().toString(36).substr(2, 9);
  console.log("New comment:", parentId, user, posttext, commentId);
  return {
    id: commentId,
    body: posttext,
    parentId,
    user: user,
  };
};

export default PostsList;