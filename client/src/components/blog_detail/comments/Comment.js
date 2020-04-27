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
                            alt={altText ? altText : "avatar"}
                        />
                    </div>
                    <label htmlFor="commentor" className="hide-from-users">
                        Name
                    </label>
                    <div className="commentor" id="commentor">
                        {name ? name : ""}
                    </div>
                </div>
                <label htmlFor="date" className="hide-from-users">
                    Date
                </label>
                <div className="date" id="date">
                    Jan 28, 2019
                </div>
            </div>
            <label htmlFor="content" className="hide-from-users">
                Comment's content
            </label>
            <p className="content" id="content">
                {content}
            </p>
        </div>
    );
}

export default Comment;
