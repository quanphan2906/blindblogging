import React, { useState, useContext, useEffect } from "react";
import BlogEditor from "./BlogEditor";
import placeholder from "../../assets/blogging.jpg";
import Button from "../common/Button";
import Title from "./Title";
import ImageUpload from "./ImageUpload";
import Topic from "./Topic";
import Axios from "axios";
import endpoints from "../../api_config/endpoints";
import errorHandler from "../../api_config/errorHandler";
import { AuthContext } from "../../contexts/AuthContext";
import Loader from "../common/Loader";

function BlogEditPage({ history, match }) {
    const { auth, isLoading: isAuthLoading, token } = useContext(AuthContext);
    const [postInfo, setPostInfo] = useState({
        title: "",
        subtitle: "",
        postImage: null,
        altText: "",
        topic: "blogging",
        content: "",
    });
    const [previewImgUrl, setPreviewImgUrl] = useState(placeholder);
    const [isPageLoading, setIsPageLoading] = useState(true);

    useEffect(() => {
        if (match.params.id && isAuthLoading === false) {
            try {
                const fetchData = async (postId) => {
                    const res = await Axios.get(endpoints.GET_POST_ID(postId));
                    const {
                        data: { post },
                    } = res;

                    if (post.author._id !== auth._id) {
                        history.push(`/blog/${postId}`);
                    } else {
                        setPostInfo(post);
                        setPreviewImgUrl(
                            endpoints.GET_IMAGE(post.postImageUrl)
                        );
                        setIsPageLoading(false);
                    }
                };

                fetchData(match.params.id);
            } catch (err) {
                errorHandler(err);
            }
        }

        if (!match.params.id) {
            setIsPageLoading(false);
        }
    }, [match, isAuthLoading, auth, history]);

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

        const keys = [
            "title",
            "subtitle",
            "postImage",
            "content",
            "topic",
            "altText",
        ];
        for (let key of keys) {
            postFormData.append(key, postInfo[key]);
        }
        // for (var pair of postFormData.entries()) {
        //     console.log(pair[0] + ", " + pair[1]);
        // }

        try {
            let res;
            if (!match.params.id) {
                res = await Axios.post(endpoints.CREATE_POST(), postFormData, {
                    headers: { Authorization: `Bearer ${token}` },
                });
            } else {
                res = await Axios.put(
                    endpoints.PUT_POST_ID(match.params.id),
                    postFormData,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
            }

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

    if (isPageLoading) return <Loader />;

    return (
        <main className="blog-editor-page">
            <Title
                title="title"
                handleChange={handleChange}
                content={postInfo.title}
            />
            <Title
                title="subtitle"
                handleChange={handleChange}
                content={postInfo.subtitle}
            />
            <Topic handleChange={handleChange} topic={postInfo.topic} />
            <ImageUpload
                previewImgUrl={previewImgUrl}
                handleFileSelected={handleFileSelected}
                handleChange={handleChange}
                altText={postInfo.altText}
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
