import React, { useState } from "react";
import BlogEditor from "./BlogEditor";
import placeholder from "../../assets/blogging.jpg";
import Button from "../common/Button";
import Title from "./Title";
import axios from "axios";
import ImageUpload from "./ImageUpload";
import Topic from "./Topic";

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
    const handleSubmit = (e) => {
        const postFormData = new FormData();

        for (let key of Object.keys(postInfo)) {
            console.log(typeof key);
            console.log(postInfo[key]);
            postFormData.append(key, postInfo[key]);
        }

        // axios.post(API_ENDPOINT);
    };
    return (
        <div className="blog-editor-page">
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
        </div>
    );
}

export default BlogEditPage;
