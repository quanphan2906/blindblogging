import React, { useState, useContext } from "react";
import Button from "../../common/Button";
import EditComment from "./EditComment";
import { AuthContext } from "../../../contexts/AuthContext";
// import socket from "../../../singletons/socket";
import SideInfo from "./SideInfo";
import { SocketContext } from "../../../contexts/SocketContext";

function ReplyComment({ comment }) {
    const { token, auth } = useContext(AuthContext);
    const { socket } = useContext(SocketContext);

    const { commentor, content } = comment;
    const { name, profileImageUrl, altText } = commentor;

    const [isEditState, setIsEditState] = useState(false);
    const [currentContent, setCurrentContent] = useState(comment.content);

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

    if (isEditState)
        return (
            <EditComment
                auth={auth}
                content={currentContent}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                action="Save new reply"
            />
        );

    return (
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
            </div>
        </div>
    );
}

export default ReplyComment;
