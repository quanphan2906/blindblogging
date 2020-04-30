import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import Button from "../../common/Button";
import Loader from "../../common/Loader";
import Image from "./Image";
import UserInfo from "./UserInfo";
import endpoints from "../../../api_config/endpoints";
import Axios from "axios";
import errorHandler from "../../../api_config/errorHandler";

function EditProfile({ history }) {
    const { auth, isLoading, token, handleAuthChange } = useContext(
        AuthContext
    );
    const [userInfo, setUserInfo] = useState({});
    const [imagePreview, setImagePreview] = useState("");
    const [error, setError] = useState("");

    const infoList = {
        name: userInfo.name,
        occupation: userInfo.occupation,
        description: userInfo.description,
    };

    useEffect(() => {
        if (isLoading === false) {
            if (!auth) {
                return history.push("/login"); //extract this to a useCallback hook
            }
            setUserInfo((userInfo) => {
                return {
                    ...userInfo,
                    name: auth.name || "",
                    occupation: auth.occupation || "",
                    description: auth.description || "",
                };
            });
            setImagePreview(endpoints.GET_IMAGE(auth.profileImageUrl));
        }
    }, [auth, isLoading, history]);

    const handleImageUpload = (e) => {
        setUserInfo({
            ...userInfo,
            profileImage: e.target.files[0],
        });

        const imageUrl = URL.createObjectURL(e.target.files[0]);
        setImagePreview(imageUrl);
    };

    const handleInfoChange = (e) => {
        setUserInfo({
            ...userInfo,
            [e.target.id]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newProfile = new FormData();

        for (let key of Object.keys(userInfo)) {
            newProfile.set(key, userInfo[key]);
        }

        try {
            if (!token) return history.push("/login");

            const res = await Axios.put(endpoints.PUT_PROFILE(), newProfile, {
                headers: { Authorization: `Bearer ${token}` },
            });

            const {
                data: { message, user },
            } = res;

            if (message === "existedEmail") {
                return setError(
                    "This email has already existed. Please use another one or login"
                );
            }
            if (message === "success") {
                return handleAuthChange(user);
            }
        } catch (err) {
            errorHandler(err);
            setError(err);
        }
    };

    if (isLoading) return <Loader />;

    return (
        <div className="profile-edit-wrapper">
            <form className="profile-edit-container">
                <Image
                    profileImageUrl={imagePreview}
                    handleImageUpload={handleImageUpload}
                />

                {Object.keys(infoList).map((key) => (
                    <UserInfo
                        infoList={infoList}
                        key={key}
                        title={key}
                        handleInfoChange={handleInfoChange}
                    />
                ))}

                <div className="button-container">
                    <Button
                        color="red"
                        action="Save"
                        handleClick={handleSubmit}
                    />
                </div>
            </form>
        </div>
    );
}

export default EditProfile;
