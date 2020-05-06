import React, { useState, useEffect, useContext } from "react";
import Author from "./Author";
import BlogDetail from "./BlogDetail";
import CommentList from "./comments/CommentList";
import Loader from "../common/Loader";
import Axios from "axios";
import endpoints from "../../api_config/endpoints";
import errorHandler from "../../api_config/errorHandler";
import { Redirect } from "react-router-dom";
import { SocketContext } from "../../contexts/SocketContext";

function BlogDetailPage(props) {
    const { socket } = useContext(SocketContext);
    const [post, setPost] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

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
                setIsError(true);
                setIsLoading(false);
            }
        };
        fetchData();
    }, [props.match.params.id]);

    useEffect(() => {
        if (!socket) return;
        socket.on("newCommentData", ({ populatedComment }) => {
            setPost((post) => {
                return {
                    ...post,
                    comments: [populatedComment, ...post.comments],
                };
            });
        });

        socket.on("newLike", () => {
            setPost((post) => {
                const currentLikeNum = post.likes || 0;
                return {
                    ...post,
                    likes: currentLikeNum + 1,
                };
            });
        });

        socket.on("changeCommentData", ({ newComment }) => {
            setPost((post) => {
                const comments = post.comments.map((comment) => {
                    if (comment._id === newComment._id) return newComment;
                    return comment;
                });

                return { ...post, comments };
            });
        });

        socket.on("deleteCommentData", ({ deletedComment }) => {
            setPost((post) => {
                const comments = post.comments.filter((comment) => {
                    return comment._id !== deletedComment._id;
                });

                return {
                    ...post,
                    comments,
                };
            });
        });

        return () => {
            socket.disconnect();
        };
    }, [socket]);

    if (isLoading) return <Loader />;
    if (isError) return <Redirect to="/" />;

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
                    <CommentList
                        likes={post.likes}
                        comments={post.comments}
                        postId={post._id}
                    />
                </main>
            </div>
        </div>
    );
}

export default BlogDetailPage;
