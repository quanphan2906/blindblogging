import React, { Fragment, useContext } from "react";
import endpoints from "../../api_config/endpoints";
import { withRouter, Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

function Author({
    author: { name, profileImageUrl, altText, occupation, description, _id },
    match,
}) {
    const { auth } = useContext(AuthContext);
    const infoObj = { name, occupation, description };
    const isProfilePage = match.path.split("/")[1] === "profile";

    let isOwner = true;
    if (!auth) {
        isOwner = false;
    } else {
        if (auth._id !== _id) isOwner = false;
    }

    return (
        <aside className="author-info-wrapper">
            <h1>About the author</h1>

            <div className="author-info-container">
                {isProfilePage === true && isOwner === true ? (
                    <div className="edit-link-container">
                        <Link to="/profile/edit">Edit Profile</Link>
                    </div>
                ) : (
                    false
                )}

                {isProfilePage === false ? (
                    <div className="view-profile-container">
                        <Link to={`/profile/${_id}`}>View profile</Link>
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
