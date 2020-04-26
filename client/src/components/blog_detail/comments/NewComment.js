import React from "react";
import endpoints from "../../../api_config/endpoints";

function NewComment({
    auth: { name = "", profileImageUrl = "", altText = "" },
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
            <textarea placeholder="Write a comment..."></textarea>
        </div>
    );
}

export default NewComment;
