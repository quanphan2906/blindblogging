import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import Axios from "axios";
import endpoints from "../../../api_config/endpoints";
import EditComment from "./EditComment";
import errorHandler from "../../../api_config/errorHandler";
// import socket from "../../../singletons/socket";
import ReplyComment from "./ReplyComment";
import { SocketContext } from "../../../contexts/SocketContext";

function ReplyCommentList({
    originalCommentId,
    isReplyState,
    setIsReplyState,
}) {
    const { auth } = useContext(AuthContext);
    const { socket } = useContext(SocketContext);

    const [replyComments, setReplyComments] = useState([]);

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
        fetchReplyComment(originalCommentId);
    }, [originalCommentId]);

    useEffect(() => {
        if (!socket) return;

        socket.on("newReplyCommentData", ({ newReplyCommentData }) => {
            if (newReplyCommentData.originalComment === originalCommentId) {
                setReplyComments((prevState) => {
                    return [...prevState, newReplyCommentData];
                });
                setIsReplyState(false);
            }
        });

        socket.on("changeCommentData", ({ newComment }) => {
            if (newComment.originalComment === originalCommentId) {
                setReplyComments((replyComments) => {
                    const comments = replyComments.map((comment) => {
                        if (comment._id === newComment._id) return newComment;
                        return comment;
                    });
                    return [...comments];
                });
            }
        });

        socket.on("deleteCommentData", ({ deletedComment }) => {
            if (deletedComment.originalComment === originalCommentId) {
                setReplyComments((replyComments) => {
                    const comments = replyComments.filter((comment) => {
                        return comment._id !== deletedComment._id;
                    });

                    return [...comments];
                });
            }
        });
    }, [originalCommentId, setIsReplyState, socket]);

    const handleReplyChange = (e) => {
        setNewReplyContent(e.target.value);
    };

    const handleReplySubmit = (e) => {
        e.preventDefault();

        socket.emit(
            "newReplyComment",
            { originalCommentId, auth, newReplyContent },
            (err) => {
                console.log(err);
            }
        );
    };

    return (
        <div className="reply-container">
            {isReplyState === true && auth ? (
                <EditComment
                    auth={auth}
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
                <ReplyComment
                    key={comment._id}
                    comment={comment}
                    isReplyComment={true}
                />
            ))}
        </div>
    );
}

export default ReplyCommentList;
