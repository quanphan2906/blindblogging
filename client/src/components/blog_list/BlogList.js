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

function BlogList({ role, location, page }) {
    const { socket } = useContext(SocketContext);
    const [postList, setPostList] = useState({});
    const [totalPage, setTotalPage] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

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

        const query = new URLSearchParams(location.search);

        fetchPostList(
            query.get("pageNum"),
            true,
            query.get("isMostRecent"),
            query.get("topic"),
            query.get("search")
        );
    }, [location.search]);

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
    if (postList.length === 0) return <NoMatchPage />;

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
