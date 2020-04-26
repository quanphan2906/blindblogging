import React from "react";
import endpoints from "../../../api_config/endpoints";

function Comment({ comment, auth }) {
    const { commentor, content } = comment;
    const { name, profileImageUrl, altText } = commentor;

    return (
        <div className="comment-container">
            <div className="side-info">
                <div className="commentor-info">
                    <div className="avatar">
                        <img
                            src={
                                profileImageUrl
                                    ? endpoints.GET_IMAGE(profileImageUrl)
                                    : ""
                            }
                            alt={altText ? altText : ""}
                        />
                    </div>
                    <div className="commentor"> {name ? name : ""} </div>
                </div>
                <div className="date">Jan 28, 2019</div>
            </div>
            <p className="content"> {content} </p>
        </div>
    );
}

export default Comment;
