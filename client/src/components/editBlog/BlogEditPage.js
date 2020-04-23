import React from "react";
import BlogEditor from "./BlogEditor";
import { useState } from "react";
import placeholder from "../../assets/blogging.jpg";
import Button from "../common/Button";
import axios from "axios";

function BlogEditPage() {
    const [postInfo, setPostInfo] = useState({
        title: "",
        subtitle: "",
        topic: "",
        postImage: null,
        altText: "",
        topic: "blogging",
        content: "",
    });
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
            <div className="title-wrapper">
                <h3>Title</h3>
                <textarea
                    id="title"
                    className="title-textarea"
                    onChange={handleChange}
                />
            </div>
            <div className="subtitle-wrapper">
                <h3>Subtitle</h3>
                <textarea
                    id="subtitle"
                    className="subtitle-textarea"
                    onChange={handleChange}
                />
            </div>
            <div className="topic-wrapper">
                <h3>Choose your topic</h3>
                <select id="topic" onChange={handleChange}>
                    <option value="blogging">Blogging</option>
                    <option value="gardening">Gardening</option>
                </select>
            </div>
            <div className="upload-wrapper">
                <h3>Upload cover image</h3>
                <div className="upload-container">
                    <img
                        src={placeholder}
                        alt="image-preview"
                        className="image-preview"
                    />
                    <div className="upload-input">
                        <input type="file" onChange={handleFileSelected} />

                        <textarea
                            id="altText"
                            type="text"
                            placeholder="Add alt text for the picture here"
                            onChange={handleChange}
                        />
                    </div>
                </div>
            </div>
            <div className="blog-editor">
                <BlogEditor
                    handleEditorChange={handleEditorChange}
                    content={postInfo.content}
                />
            </div>
            <div className="button-wrapper">
                <Button action="Cancel" color="grey" />
                <Button action="Save" color="red" handleClick={handleSubmit} />
            </div>
        </div>
    );
}

export default BlogEditPage;
