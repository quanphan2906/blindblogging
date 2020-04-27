import React from "react";
import endpoints from "../../../api_config/endpoints";
import Button from "../../common/Button";

function NewComment({
    auth: { name = "", profileImageUrl = "", altText = "" },
    newComment,
    handleChange,
    handleSubmit,
}) {
    return (
        <div className="comment-container">
            <div className="side-info">
                <div className="commentor-info">
                    <div className="avatar">
                        <img
                            src={
                                profileImageUrl !== ""
                                    ? endpoints.GET_IMAGE(profileImageUrl)
                                    : ""
                            }
                            alt={altText}
                        />
                    </div>
                    <div className="commentor"> {name} </div>
                </div>
            </div>
            <textarea
                value={newComment}
                placeholder="Write a comment..."
                onChange={handleChange}
            ></textarea>
            <div className="button-container">
                <Button
                    action="Post comment"
                    color="red"
                    handleClick={handleSubmit}
                />
            </div>
        </div>
    );
}

export default NewComment;
