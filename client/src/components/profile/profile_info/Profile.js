import React, { useRef, useState, useEffect } from "react";
import Author from "../../blog_detail/Author";
import BlogList from "../../blog_list/BlogList";
import Loader from "../../common/Loader";
import errorHandler from "../../../api_config/errorHandler";
import Axios from "axios";
import endpoints from "../../../api_config/endpoints";
import ReactDOM from "react-dom";
import Search from "./Search";

function Profile({ match, location, history }) {
    const [author, setAuthor] = useState({});
    const [postList, setPostList] = useState({});
    const [totalPage, setTotalPage] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    const searchInput = useRef();

    useEffect(() => {
        const fetchAuthor = async (id) => {
            try {
                const res = await Axios.get(endpoints.GET_PROFILE_ID(id));

                const {
                    data: { user },
                } = res;

                return user;
            } catch (err) {
                errorHandler(err);
            }
        };

        const fetchPostList = async (
            id,
            pageNum = 1,
            isCommentLength = true,
            searchString = null
        ) => {
            try {
                const res = await Axios.get(endpoints.GET_POSTS(id), {
                    params: {
                        userId: id,
                        pageNum,
                        isCommentLength,
                        searchString,
                    },
                });

                const {
                    data: { posts, totalPage },
                } = res;

                return { posts, totalPage };
            } catch (err) {
                errorHandler(err);
            }
        };

        const id = match.params.id;
        const query = new URLSearchParams(location.search);

        Promise.all([
            fetchAuthor(id),
            fetchPostList(id, query.get("pageNum"), true, query.get("search")),
        ]).then(([user, { posts, totalPage }]) => {
            ReactDOM.unstable_batchedUpdates(() => {
                setAuthor(user);
                setPostList(posts);
                setTotalPage(parseInt(totalPage));
                setIsLoading(false);
            });
        });
    }, [match.params.id, match.params.pageNum, location.search]);

    const handleSearch = async (e) => {
        e.preventDefault();

        const searchValue = searchInput.current.value;
        const query = new URLSearchParams(location.search);

        if (searchValue === "") {
            if (query.has("search")) query.delete("search");
        } else {
            query.set("search", searchValue);
        }

        history.push({
            pathname: location.pathname,
            search: query.toString(),
        });
    };

    if (isLoading) return <Loader />;

    return (
        <div className="profile-page-wrapper">
            <Author author={author} />
            <main className="profile-page-container">
                <h1>Your past posts</h1>
                <Search handleSearch={handleSearch} searchInput={searchInput} />
                {/* add select form here when add draft functionality */}
                <BlogList postList={postList} totalPage={totalPage} />
            </main>
        </div>
    );
}

export default Profile;
