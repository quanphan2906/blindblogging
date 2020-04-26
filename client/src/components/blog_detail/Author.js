import React from "react";
import endpoints from "../../api_config/endpoints";

function Author({
    author: { name, profileImageUrl, altText, occupation, description },
}) {
    return (
        <aside className="author-info-wrapper">
            <h1>About the author</h1>
            <div className="author-info-container">
                <div className="profile-img-container">
                    <img
                        src={
                            profileImageUrl
                                ? endpoints.GET_IMAGE(profileImageUrl)
                                : ""
                        }
                        alt={altText ? altText : "avatar"}
                    />
                </div>
                <div className="name"> {name} </div>
                <div className="occupation"> {occupation} </div>
                <p className="description"> {description}</p>
            </div>
        </aside>
    );
}

export default Author;
