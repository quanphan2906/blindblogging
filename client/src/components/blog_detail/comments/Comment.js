import React, { useState, useContext } from "react";
import Button from "../../common/Button";
import EditComment from "./EditComment";
import { AuthContext } from "../../../contexts/AuthContext";
import { SocketContext } from "../../../contexts/SocketContext";
import SideInfo from "./SideInfo";
import ReplyCommentList from "./ReplyCommentList";

function Comment({ comment }) {
    const { token, auth } = useContext(AuthContext);
    const { socket } = useContext(SocketContext);

    const { commentor, content } = comment;
    const { name, profileImageUrl, altText } = commentor;

    const [isEditState, setIsEditState] = useState(false);
    const [currentContent, setCurrentContent] = useState(comment.content);

    const [isReplyState, setIsReplyState] = useState(false);

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
                    <Button
                        action="Reply"
                        color="red"
                        fontSize="16px"
                        handleClick={handleReply}
                    />
                </div>
            </div>
            <ReplyCommentList
                originalCommentId={comment._id}
                setIsReplyState={setIsReplyState}
                isReplyState={isReplyState}
            />
        </>
    );
}

export default Comment;
