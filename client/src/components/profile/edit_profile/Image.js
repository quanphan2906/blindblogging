import React from "react";
import endpoints from "../../../api_config/endpoints";

function Image({ profileImageUrl, handleImageUpload }) {
    return (
        <div className="profile-image-wrapper grid-col">
            <h1>Profile image</h1>
            <div className="profile-image-container">
                <div></div>
                <div className="profile-image">
                    <img src={profileImageUrl} alt="" />
                </div>
                <div>
                    <input type="file" onChange={handleImageUpload} />
                </div>
            </div>
        </div>
    );
}

export default Image;
