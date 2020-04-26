import React, { useState, useEffect } from "react";
import Author from "./Author";
import BlogDetail from "./BlogDetail";
import CommentList from "./comments/CommentList";
import Loader from "../common/Loader";
import Axios from "axios";
import endpoints from "../../api_config/endpoints";
import errorHandler from "../../api_config/errorHandler";

function BlogDetailPage(props) {
    const [post, setPost] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await Axios.get(
                    endpoints.GET_POST_ID(props.match.params.id)
                );
                const {
                    data: { post },
                } = res;
                setPost(post);
                setIsLoading(false);
            } catch (err) {
                errorHandler(err);
                setIsLoading(false);
            }
        };
        fetchData();
    }, [props.match.params.id]);
    if (isLoading) return <Loader />;
    return (
        <div className="blog-detail-page-wrapper">
            <div className="blog-detail-page">
                <Author author={post.author} />
                <main className="blog-detail-wrapper">
                    <BlogDetail
                        title={post.title}
                        subtitle={post.subtitle}
                        postImageUrl={post.postImageUrl}
                        altText={post.altText}
                        topic={post.topic}
                        content={post.content}
                    />
                    <div className="divider"></div>
                    <CommentList likes={post.likes} comments={post.comments} />
                </main>
            </div>
        </div>
    );
}

export default BlogDetailPage;
