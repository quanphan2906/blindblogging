import React, { useState, useEffect } from "react";
import Author from "../../blog_detail/Author";
import BlogList from "../../blog_list/BlogList";
import Loader from "../../common/Loader";
import errorHandler from "../../../api_config/errorHandler";
import Axios from "axios";
import endpoints from "../../../api_config/endpoints";
import Search from "../../common/Search";

function Profile({ match }) {
    const [author, setAuthor] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchAuthor = async (id) => {
            try {
                const res = await Axios.get(endpoints.GET_PROFILE_ID(id));

                const {
                    data: { user },
                } = res;

                setAuthor(user);
                setIsLoading(false);
            } catch (err) {
                errorHandler(err);
            }
        };

        fetchAuthor(match.params.id);
    }, [match.params.id]);

    if (isLoading) return <Loader />;

    return (
        <div className="profile-page-wrapper">
            <Author author={author} />
            <main className="profile-page-container">
                <h1>Your past posts</h1>
                <Search />
                {/* add select form here when add draft functionality */}
                <BlogList role="author" />
            </main>
        </div>
    );
}

export default Profile;
