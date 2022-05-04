import { useState } from 'react';

import './Post.css';

const PostForm = ({ handleSubmit, submitLabel }) => {
    const [posttext, setPosttext] = useState("");
    const [user, setUser] = useState("");
    
    const SubmitButton = () => {
        if (user && posttext) {
            return <button className="btn btn-primary">Submit</button>
        } else {
            return <button className="btn btn-primary" disabled>Submit</button>
        };
    };

    const onSubmit = (e) => {
        e.preventDefault();
        handleSubmit(user, posttext);
        setPosttext("");
        setUser("");
    };

    return (
         <div>
            <div className="container pt-3 centered">
                <div className={submitLabel === "Reply" ? "card w-100" : "card w-50"}>
                    <div className="card-body">
                        <h4 className="card-title">{submitLabel === "Write" ? 'New Post' : ''}</h4>
                        <form onSubmit={onSubmit}>
                            <div className="mb-3">
                                <input name="user" value={user} onChange={(e) => setUser(e.target.value)} required type="text" className="form-control" placeholder="Name..."/>
                            </div>
                            <div className="mb-3">
                                <textarea name="posttext" value={posttext} onChange={(e) => setPosttext(e.target.value)} required className="form-control" placeholder="Write a new post..."/>
                            </div>
                            <div className="text-end">
                                <SubmitButton />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default PostForm;