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
    const [message, setMessage] = useState({ content: "", color: "" });

    const infoList = {
        name: userInfo.name,
        occupation: userInfo.occupation,
        description: userInfo.description,
    };

    useEffect(() => {
        if (isLoading === false) {
            if (!auth) {
                return history.push("/login");
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
        setMessage({ ...message, content: "", color: "" });
    };

    const handleInfoChange = (e) => {
        setUserInfo({
            ...userInfo,
            [e.target.id]: e.target.value,
        });
        setMessage({ ...message, content: "", color: "" });
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
                return setMessage({
                    ...message,
                    content:
                        "This email has been used. Please choose another one",
                    color: "red",
                });
            }
            if (message === "success") {
                setMessage({
                    ...message,
                    content: "Profile changed success",
                    color: "green",
                });
                return handleAuthChange(user);
            }
        } catch (err) {
            errorHandler(err);
            setMessage({
                ...message,
                content: "Error occurred. Please reload and try again",
                color: "red",
            });
        }
    };

    if (isLoading) return <Loader />;

    return (
        <main className="profile-edit-wrapper">
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

                <div
                    role="alert"
                    style={{ color: message.color }}
                    className="text-align-center"
                >
                    {message.content}
                </div>
            </form>
        </main>
    );
}

export default EditProfile;
