import React, { useEffect, useState, useContext } from "react";
import BlogSummary from "./BlogSummary";
import PageNav from "./PageNav";
import NoMatchPage from "../common/NoMatchPage";
import { withRouter } from "react-router-dom";
import Axios from "axios";
import endpoints from "../../api_config/endpoints";
import errorHandler from "../../api_config/errorHandler";
import Loader from "../common/Loader";
import { SocketContext } from "../../contexts/SocketContext";
// import socket from "../../singletons/socket";

const NO_POST_MESSAGE = "You have not had any posts";
const NOT_FOUND_MESSAGE = "Sorry, we cannot find what you are looking for";

function BlogList({ role, location, page, match }) {
    const { socket } = useContext(SocketContext);
    const [postList, setPostList] = useState([]);
    const [totalPage, setTotalPage] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [message, setMessage] = useState(NOT_FOUND_MESSAGE);

    useEffect(() => {
        const fetchPostList = async (
            pageNum = 1,
            isCommentLength = true,
            isMostRecent = true,
            topic = null,
            searchString = null
        ) => {
            try {
                const res = await Axios.get(endpoints.GET_POSTS(), {
                    params: {
                        pageNum,
                        isCommentLength,
                        isMostRecent,
                        topic,
                        searchString,
                    },
                });

                const {
                    data: { posts, totalPage },
                } = res;

                setPostList(posts);
                setTotalPage(totalPage);
                setIsLoading(false);
            } catch (err) {
                errorHandler(err);
            }
        };

        const fetchUserPosts = async (userId) => {
            try {
                const res = await Axios.get(endpoints.GET_POSTS(), {
                    params: {
                        userId,
                    },
                });

                const {
                    data: { posts, totalPage },
                } = res;

                if (totalPage != 0) {
                    setPostList(posts);
                    setTotalPage(totalPage);
                } else {
                    console.log("yo");
                    setMessage(NO_POST_MESSAGE);
                }
                setIsLoading(false);
            } catch (err) {
                errorHandler(err);
            }
        };

        const query = new URLSearchParams(location.search);

        if (match.params.id) {
            fetchUserPosts(match.params.id);
        } else {
            fetchPostList(
                query.get("pageNum"),
                true,
                query.get("isMostRecent"),
                query.get("topic"),
                query.get("search")
            );
        }
    }, [location.search, match.params.id]);

    useEffect(() => {
        if (!socket) return;
        socket.on("newCommentData", ({ populatedComment }) => {
            setPostList((postList) => {
                return postList.map((post) => {
                    if (post._id === populatedComment.post) {
                        post.commentLength += 1;
                    }
                    return post;
                });
            });
        });

        socket.on("deleteCommentData", ({ deletedComment }) => {
            setPostList((postList) => {
                return postList.map((post) => {
                    if (post._id === deletedComment.post) {
                        post.commentLength -= 1;
                    }
                    return post;
                });
            });
        });

        socket.on("newLike", ({ postId }) => {
            setPostList((postList) => {
                const newPostList = postList.map((post) => {
                    console.log(post);
                    if (post._id === postId) {
                        post.likes += 1;
                    }
                    return post;
                });
                return newPostList;
            });
        });

        return () => {
            socket.disconnect();
        };
    }, [socket]);

    if (isLoading) return <Loader />;
    if (postList.length === 0) return <NoMatchPage message={message} />;

    return (
        <div className="blog-list-wrapper">
            <div className="blog-list-container">
                {postList.map((post) => (
                    <BlogSummary
                        post={post}
                        key={post._id}
                        role={role}
                        page={page}
                    />
                ))}
            </div>
            <PageNav totalPage={totalPage} />
        </div>
    );
}

export default withRouter(BlogList);
