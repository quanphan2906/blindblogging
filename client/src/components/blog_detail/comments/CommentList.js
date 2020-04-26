import React, { useContext } from "react";
import Button from "../../common/Button";
import Comment from "./Comment";
import { AuthContext } from "../../../contexts/AuthContext";
import NewComment from "./NewComment";

function CommentList({ likes, comments }) {
    const auth = useContext(AuthContext);
    console.log(auth);
    return (
        <div className="comment-list-wrapper">
            <div className="like-container">
                <h1>Likes {likes} </h1>
                <Button color="red" action="Like" />
            </div>
            <div className="comment-list-container">
                <h1>Comments</h1>
                <div className="comments-wrapper">
                    {auth ? <NewComment auth={auth} /> : false}
                    {comments.map((comment) => (
                        <Comment key={comment._id} comment={comment} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default CommentList;
