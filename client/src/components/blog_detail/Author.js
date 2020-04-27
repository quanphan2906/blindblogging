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
                <label htmlFor="name" className="hide-from-users">
                    Name
                </label>
                <span className="name" id="name">
                    {name}
                </span>
                <label htmlFor="occupation" className="hide-from-users">
                    Occupation
                </label>
                <span className="occupation" id="occupation">
                    {occupation}
                </span>
                <label htmlFor="description" className="hide-from-users">
                    Description
                </label>
                <p className="description" id="description">
                    {description}
                </p>
            </div>
        </aside>
    );
}

export default Author;
