import React from "react";
import placeholder from "../../assets/ipad_and_plant.jpg";

function EditProfile() {
    return (
        <div className="profile-edit-wrapper">
            <div className="profile-edit-container">
                <div className="profile-image-container">
                    <h1>Profile image</h1>
                    <div>
                        <input type="file" />
                        <img src={placeholder} alt="" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditProfile;
