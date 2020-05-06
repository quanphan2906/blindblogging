import React, { useContext, useState } from "react";
import Button from "../../common/Button";
import Comment from "./Comment";
import { AuthContext } from "../../../contexts/AuthContext";
import EditComment from "./EditComment";
import { Link } from "react-router-dom";
import { SocketContext } from "../../../contexts/SocketContext";

function CommentList({ likes, comments, postId, width = "100%" }) {
    const { auth } = useContext(AuthContext);
    const { socket } = useContext(SocketContext);

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

    const handleLike = (e) => {
        //in the future -> save a list of likers
        //if the person has liked the post -> no more like
        if (auth._id) {
            socket.emit("like", { postId }, (err) => {
                console.log(err);
            });
        }
    };

    return (
        <div className="comment-list-wrapper" style={{ width }}>
            <div className="like-container">
                <div>
                    <h1>Likes</h1>
                    <span> {likes ? likes : 0} </span>
                </div>
                {auth ? (
                    <Button
                        color="red"
                        action="Like"
                        handleClick={handleLike}
                    />
                ) : (
                    <Link to="/login">Login to like and comment</Link>
                )}
            </div>
            <div className="comment-list-container">
                <h1>Comments</h1>
                <div className="comments-wrapper">
                    {auth ? (
                        <EditComment
                            auth={auth}
                            content={newComment}
                            handleChange={handleChange}
                            handleSubmit={handleSubmit}
                            action="Post comment"
                        />
                    ) : (
                        false
                    )}
                    {comments.map((comment) => (
                        <Comment
                            key={comment._id}
                            comment={comment}
                            auth={auth}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default CommentList;
