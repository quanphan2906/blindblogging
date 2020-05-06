import React from "react";
import endpoints from "../../../api_config/endpoints";
import Button from "../../common/Button";

function EditComment({
    auth: { name = "", profileImageUrl = "", altText = "" },
    content,
    handleChange,
    handleSubmit,
    action,
    width = "100%",
}) {
    return (
        <div className="comment-container" style={{ width }}>
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
                value={content}
                placeholder="Write a comment..."
                onChange={handleChange}
            ></textarea>
            <div className="button-container">
                <Button
                    action={action}
                    color="red"
                    handleClick={handleSubmit}
                />
            </div>
        </div>
    );
}

export default EditComment;
