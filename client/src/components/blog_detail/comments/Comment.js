import React from "react";
import endpoints from "../../../api_config/endpoints";
import moment from "moment";

function Comment({ comment }) {
    const { commentor, content } = comment;
    const { name, profileImageUrl, altText } = commentor;

    const dateFormat = (originalDate) => {
        const date = new Date(originalDate);
        const UTCDate = date.toUTCString();
        return moment(UTCDate).format("MMM Do YYYY");
    };

    return (
        <div className="comment-container">
            <div className="side-info">
                <div className="commentor-info">
                    <div className="avatar">
                        {profileImageUrl ? (
                            <img
                                src={endpoints.GET_IMAGE(profileImageUrl)}
                                alt={altText ? altText : "avatar"}
                            />
                        ) : (
                            false
                        )}
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
                    {dateFormat(comment.updatedAt)}
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
