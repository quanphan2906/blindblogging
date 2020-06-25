import React, { useContext, useState } from "react";
import Button from "../../common/Button";
import Comment from "./Comment";
import { AuthContext } from "../../../contexts/AuthContext";
import EditComment from "./EditComment";
import { Link } from "react-router-dom";
import Likers from "./Likers";
import { SocketContext } from "../../../contexts/SocketContext";
// import socket from "../../../singletons/socket";

function CommentList({ likes, comments, postId, width = "100%", likers }) {
    const { auth } = useContext(AuthContext);
    const { socket } = useContext(SocketContext);

    const [newComment, setNewComment] = useState("");
    const [isLikerCompOpen, setIsLikerCompOpen] = useState(false);

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
        if (auth._id) {
            let hasLiked = false;
            for (let liker of likers) {
                if (auth._id === liker) hasLiked = true;
            }

            if (hasLiked === false) {
                socket.emit("like", { postId, userId: auth._id }, (err) => {
                    console.log(err);
                });
            } else return null;
        }
    };

    const handleSeeLikers = (state) => {
        setIsLikerCompOpen(state);
    };

    if (isLikerCompOpen) return <Likers likers={likers} />;

    return (
        <div className="comment-list-wrapper" style={{ width }}>
            <div className="like-container">
                <div>
                    <h1>Likes</h1>
                    <span> {likes ? likes : 0} </span>
                    <Button
                        action="See people like this post"
                        color="orange"
                        fontSize="14px"
                        handleClick={() => {
                            handleSeeLikers(true);
                        }}
                    />
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
                        <Comment key={comment._id} comment={comment} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default CommentList;
