import React, { useState, useContext, useEffect } from "react";
import endpoints from "../../../api_config/endpoints";
import Button from "../../common/Button";
import EditComment from "./EditComment";
import { AuthContext } from "../../../contexts/AuthContext";
import Axios from "axios";
import errorHandler from "../../../api_config/errorHandler";
import { SocketContext } from "../../../contexts/SocketContext";
import SideInfo from "./SideInfo";

function Comment({ comment, auth, isReplyComment = false }) {
    const { token, auth: authContext } = useContext(AuthContext);
    const { socket } = useContext(SocketContext);

    const { commentor, content, _id: commentId } = comment;
    const { name, profileImageUrl, altText } = commentor;

    const [isEditState, setIsEditState] = useState(false);
    const [currentContent, setCurrentContent] = useState(comment.content);

    const [replyComments, setReplyComments] = useState([]);

    const [isReplyState, setIsReplyState] = useState(false);
    const [newReplyContent, setNewReplyContent] = useState("");

    useEffect(() => {
        const fetchReplyComment = async (commentId) => {
            try {
                const res = await Axios.get(endpoints.GET_COMMENTS(), {
                    params: { commentId },
                });

                const {
                    data: { comments },
                } = res;

                setReplyComments(comments);
            } catch (err) {
                errorHandler(err);
            }
        };
        fetchReplyComment(commentId);
    }, [commentId]);

    useEffect(() => {
        if (!socket) return;

        socket.on("newReplyCommentData", ({ newReplyCommentData }) => {
            const { originalComment } = newReplyCommentData;
            if (originalComment === commentId) {
                setReplyComments((prevState) => {
                    return [...prevState, newReplyCommentData];
                });
                setIsReplyState(false);
            }
        });

        return () => {
            socket.disconnect();
        };
    }, [socket, commentId]);

    const handleEdit = () => {
        setIsEditState(true);
    };

    const handleChange = (e) => {
        setCurrentContent(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        socket.emit(
            "changeComment",
            {
                commentId: comment._id,
                content: currentContent,
                jwtToken: token,
            },
            (err) => {
                console.log(err.statusCode + " " + err.message);
            }
        );

        setIsEditState(false);
    };

    const handleDelete = () => {
        socket.emit(
            "deleteComment",
            {
                commentId: comment._id,
                jwtToken: token,
            },
            (err) => {
                console.log(err.statusCode + " " + err.message);
            }
        );
    };

    const handleReply = () => {
        setIsReplyState(true);
    };

    const handleReplyChange = (e) => {
        setNewReplyContent(e.target.value);
    };

    const handleReplySubmit = (e) => {
        e.preventDefault();

        socket.emit(
            "newReplyComment",
            { commentId, authContext, newReplyContent },
            (err) => {
                console.log(err);
            }
        );
    };

    if (isEditState)
        return (
            <EditComment
                auth={auth}
                content={currentContent}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                action="Save new comment"
            />
        );

    return (
        <>
            <div className="comment-container">
                <SideInfo
                    profileImageUrl={profileImageUrl}
                    altText={altText}
                    name={name}
                    updatedAt={comment.updatedAt}
                />
                <label htmlFor="content" className="hide-from-users">
                    Comment's content
                </label>
                <p className="content" id="content">
                    {content}
                </p>
                <div className="action-containers">
                    {auth ? (
                        auth._id === commentor._id ? (
                            <>
                                <Button
                                    action="Edit"
                                    color="orange"
                                    fontSize="16px"
                                    handleClick={handleEdit}
                                />
                                <Button
                                    action="Delete"
                                    color="grey"
                                    fontSize="16px"
                                    handleClick={handleDelete}
                                />
                            </>
                        ) : (
                            false
                        )
                    ) : (
                        false
                    )}
                    {isReplyComment === false ? (
                        <Button
                            action="Reply"
                            color="red"
                            fontSize="16px"
                            handleClick={handleReply}
                        />
                    ) : (
                        false
                    )}
                </div>
            </div>
            {isReplyComment === false ? (
                <div className="reply-container">
                    {isReplyState === true && auth ? (
                        <EditComment
                            auth={authContext}
                            action="Post reply comment"
                            handleChange={handleReplyChange}
                            handleSubmit={handleReplySubmit}
                            content={newReplyContent}
                            width="80%"
                        />
                    ) : (
                        false
                    )}
                    {replyComments.map((comment) => (
                        <Comment
                            key={comment._id}
                            comment={comment}
                            auth={auth}
                            isReplyComment={true}
                        />
                    ))}
                </div>
            ) : (
                false
            )}
        </>
    );
}

export default Comment;
