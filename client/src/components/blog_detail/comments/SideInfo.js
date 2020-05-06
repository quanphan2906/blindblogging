import React from "react";
import endpoints from "../../../api_config/endpoints";
import dateFormat from "../../../helpers/dateFormat";

function SideInfo({ profileImageUrl, altText, updatedAt, name }) {
    return (
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
                {dateFormat(updatedAt)}
            </div>
        </div>
    );
}

export default SideInfo;
