import React, { Fragment } from "react";
import endpoints from "../../api_config/endpoints";
import { withRouter, Link } from "react-router-dom";

function Author({
    author: { name, profileImageUrl, altText, occupation, description },
    match,
}) {
    const infoObj = { name, occupation, description };
    const isProfilePage = match.path.split("/")[1] === "profile";
    return (
        <aside className="author-info-wrapper">
            <h1>About the author</h1>
            <div className="author-info-container">
                {isProfilePage === true ? (
                    <div className="edit-link-container">
                        <Link to="/profile/edit">Edit Profile</Link>
                    </div>
                ) : (
                    false
                )}
                <div className="profile-img-container">
                    {profileImageUrl ? (
                        <img
                            src={endpoints.GET_IMAGE(profileImageUrl)}
                            alt={altText ? altText : "avatar"}
                        />
                    ) : (
                        false
                    )}
                </div>
                {Object.keys(infoObj).map((key) => {
                    return (
                        <Fragment key={key}>
                            <label htmlFor={key} className="hide-from-users">
                                {key}
                            </label>
                            <div className={key} id={key}>
                                {infoObj[key]}
                            </div>
                        </Fragment>
                    );
                })}
            </div>
        </aside>
    );
}

export default withRouter(Author);
