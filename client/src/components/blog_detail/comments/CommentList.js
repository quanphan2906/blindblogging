import React, { useContext, useState } from "react";
import Button from "../../common/Button";
import Comment from "./Comment";
import { AuthContext } from "../../../contexts/AuthContext";
import NewComment from "./NewComment";

function CommentList({ likes, comments, postId, socket }) {
    const auth = useContext(AuthContext);

    const [newComment, setNewComment] = useState("");

    const handleChange = (e) => {
        setNewComment(e.target.value);
    };
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!newComment) return;

        socket.emit(
            "newComment",
            {
                postId: postId,
                content: newComment,
                commentor: auth._id,
            },
            (err) => {
                console.log(err);
            }
        );
        setNewComment("");
    };
    return (
        <div className="comment-list-wrapper">
            <div className="like-container">
                <h1>Likes {likes} </h1>
                <Button color="red" action="Like" />
            </div>
            <div className="comment-list-container">
                <h1>Comments</h1>
                <div className="comments-wrapper">
                    {auth ? (
                        <NewComment
                            auth={auth}
                            newComment={newComment}
                            handleChange={handleChange}
                            handleSubmit={handleSubmit}
                        />
                    ) : (
                        false
                    )}
                    {comments.map((comment) => (
                        <Comment key={comment._id} comment={comment} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default CommentList;
