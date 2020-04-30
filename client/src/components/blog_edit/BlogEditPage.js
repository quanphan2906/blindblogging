import React, { useState } from "react";
import BlogEditor from "./BlogEditor";
import placeholder from "../../assets/blogging.jpg";
import Button from "../common/Button";
import Title from "./Title";
import ImageUpload from "./ImageUpload";
import Topic from "./Topic";
import Axios from "axios";
import endpoints from "../../api_config/endpoints";
import errorHandler from "../../api_config/errorHandler";

function BlogEditPage() {
    const [postInfo, setPostInfo] = useState({
        title: "",
        subtitle: "",
        postImage: null,
        altText: "",
        topic: "blogging",
        content: "",
    });
    const [previewImgUrl, setPreviewImgUrl] = useState(placeholder);

    const handleChange = (e) => {
        setPostInfo({
            ...postInfo,
            [e.target.id]: e.target.value,
        });
    };

    const handleFileSelected = (e) => {
        setPostInfo({
            ...postInfo,
            postImage: e.target.files[0],
        });
        const imageUrl = URL.createObjectURL(e.target.files[0]);
        setPreviewImgUrl(imageUrl);
    };

    const handleEditorChange = (newContent, editor) => {
        setPostInfo({
            ...postInfo,
            content: newContent,
        });
    };

    const handleSubmit = async (e) => {
        const postFormData = new FormData();

        for (let key of Object.keys(postInfo)) {
            console.log(typeof key);
            console.log(postInfo[key]);
            postFormData.append(key, postInfo[key]);
        }
        for (var pair of postFormData.entries()) {
            console.log(pair[0] + ", " + pair[1]);
        }

        const token = localStorage.getItem("JWT token");

        try {
            const res = await Axios.post(
                endpoints.CREATE_POST(),
                postFormData,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            const {
                data: { message, post },
            } = res;
            if (message === "success") {
                console.log(message);
            }
        } catch (err) {
            errorHandler(err);
        }
    };

    return (
        <main className="blog-editor-page">
            <Title title="title" handleChange={handleChange} />
            <Title title="subtitle" handleChange={handleChange} />
            <Topic handleChange={handleChange} />
            <ImageUpload
                previewImgUrl={previewImgUrl}
                handleFileSelected={handleFileSelected}
                handleChange={handleChange}
            />
            <BlogEditor
                handleEditorChange={handleEditorChange}
                content={postInfo.content}
            />
            <div className="button-wrapper">
                <Button action="Cancel" color="grey" />
                <Button action="Save" color="red" handleClick={handleSubmit} />
            </div>
        </main>
    );
}

export default BlogEditPage;
